import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { icons } from "../../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
	return (
		<View className="flex items-center justify-center gap-2">
			<Image
				source={icon}
				resizeMode="contain"
				tintColor={color}
				className="w-6 h-6"
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

const HuntLayout = () => {
	const { huntId } = useLocalSearchParams();
  // TODO: create context
  // TODO: fetch hunt data and add it to context for children screens to use
  // so that it doesn't have to be fetched multiple times
  // TODO: Make tab icons smaller

	return (
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
				name="tasks"
				initialParams={{ huntId: huntId }}
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
			<Tabs.Screen
				name="leaderboard"
				options={{
					title: "leaderboard",
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<TabIcon
							icon={icons.home}
							color={color}
							name="Leaderboard"
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
							name="Announce"
							focused={focused}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default HuntLayout;
