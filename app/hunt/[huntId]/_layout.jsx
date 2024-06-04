import React, { createContext, useContext, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { icons } from "../../../constants";
import { useQuery } from "@tanstack/react-query";
import { supabase, getHunt } from "../../../lib/supabase";

const TabIcon = ({ icon, color, name, focused }) => {
	return (
		<View className="flex items-center justify-center gap-2">
			<Image
				source={icon}
				resizeMode="contain"
				tintColor={color}
				className="w-5 h-5"
			/>
			<Text
				className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
				style={{ color: color }}
			>
				{name}
			</Text>
		</View>
	);
};

const Context = createContext();
export const useHuntContext = () => useContext(Context);

const HuntLayout = () => {
	const { huntId } = useLocalSearchParams();
	let hunt = null;

	useEffect(() => {
		const channel = supabase
			.channel("custom")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "announcements",
				},
				(payload) => {
				}
			)
			.subscribe();
	}, []);

	const { data, isLoading, error } = useQuery({
		queryKey: ["hunt"],
		queryFn: () => getHunt(huntId),
	});

	if (!isLoading) {
		hunt = data.data[0];
	}

	return (
		<>
			{!isLoading && (
				<Context.Provider value={{ huntId, hunt, isLoading }}>
					<Tabs
						screenOptions={{
							tabBarActiveTintColor: "#FFA001",
							tabBarInactiveTintColor: "#CDCDE0",
							tabBarShowLabel: false,
							tabBarStyle: {
								backgroundColor: "#161622",
								borderTopWidth: 1,
								borderTopColor: "#232533",
								height: 104,
							},
						}}
					>
						<Tabs.Screen
							name="home"
							options={{
								title: "Home",
								headerShown: false,
								tabBarIcon: ({ color, focused }) => (
									<TabIcon
										icon={icons.home}
										color={color}
										name="Home"
										focused={focused}
									/>
								),
							}}
						/>
						<Tabs.Screen
							name="tasks"
							options={{
								title: "tasks",
								headerShown: false,
								unmountOnBlur: true,
								tabBarIcon: ({ color, focused }) => (
									<TabIcon
										icon={icons.home}
										color={color}
										name="Tasks"
										focused={focused}
									/>
								),
							}}
						/>
						<Tabs.Screen
							name="announce"
							options={{
								title: "announcements",
								headerShown: false,
								tabBarIcon: ({ color, focused }) => (
									<TabIcon
										icon={icons.home}
										color={color}
										name="Notice"
										focused={focused}
									/>
								),
							}}
						/>
						<Tabs.Screen
							name="leaderboard"
							options={{
								title: "leaderboard",
								headerShown: false,
								tabBarIcon: ({ color, focused }) => (
									<TabIcon
										icon={icons.home}
										color={color}
										name="Leaders"
										focused={focused}
									/>
								),
							}}
						/>
						<Tabs.Screen
							name="teams"
							options={{
								title: "teams",
								headerShown: false,
								tabBarIcon: ({ color, focused }) => (
									<TabIcon
										icon={icons.home}
										color={color}
										name="Teams"
										focused={focused}
									/>
								),
							}}
						/>
					</Tabs>
				</Context.Provider>
			)}
		</>
	);
};

export default HuntLayout;
