import React, { createContext, useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import { Tabs } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getHunt } from "../../../lib/supabase";
import { Ionicons } from '@expo/vector-icons';

const Context = createContext();
export const useHuntContext = () => useContext(Context);

const HuntLayout = () => {
	const { huntId } = useLocalSearchParams();

	let hunt = null

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
								tabBarLabel: 'Home',
								tabBarIcon: ({ color, focused, size }) => (
									<Ionicons
										color={color}
										name={focused ? "home" : 'home-outline'}
										size = {size}
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
								tabBarLabel: 'Tasks',
								tabBarIcon: ({ color, focused, size }) => (
									<Ionicons
										color={color}
										name={focused ? "receipt" : 'receipt-outline'}
										size = {size}
									/>
								),
							}}
						/>
						<Tabs.Screen
							name="announce"
							options={{
								title: "announcements",
								headerShown: false,
								tabBarLabel: 'Tasks',
								tabBarIcon: ({ color, focused, size }) => (
									<Ionicons
										color={color}
										name={focused ? "megaphone" : 'megaphone-outline'}
										size = {size}
									/>
								),
							}}
						/>
						<Tabs.Screen
							name="leaderboard"
							options={{
								title: "leaderboard",
								headerShown: false,
								tabBarLabel: 'Leaderboard',
								tabBarIcon: ({ color, focused, size }) => (
									<Ionicons
										color={color}
										name={focused ? "trophy" : 'trophy-outline'}
										size = {size}
									/>
								),
							}}
						/>
						<Tabs.Screen
							name="teams"
							options={{
								title: "teams",
								headerShown: false,
								tabBarLabel: 'Teams',
								tabBarIcon: ({ color, focused, size }) => (
									<Ionicons
										color={color}
										name={focused ? "people" : 'people-outline'}
										size = {size}
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
