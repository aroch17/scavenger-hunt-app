import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { icons } from "../../constants";
import { Ionicons } from '@expo/vector-icons';

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

const HostLayout = () => {
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
				name="hunts"
				options={{
					title: "hunts",
					headerShown: false,
					unmountOnBlur: true,
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
				name="profile"
				options={{
					title: "Profile",
					headerShown: false,
					tabBarLabel: 'Profile',
					tabBarIcon: ({ color, focused, size }) => (
						<Ionicons
								color={color}
								name={focused ? "person" : 'person-outline'}
								size = {size}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default HostLayout;
