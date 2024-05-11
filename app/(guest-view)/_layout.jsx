import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { icons } from "../../constants";
import { SplashScreen, Stack } from "expo-router";
import { GlobalProvider } from "../../context/GlobalProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


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

const queryClient = new QueryClient();

const GuestLayout = () => {
	return (
		<>
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
					name="guest-home"
					options={{
						title: "Home",
						headerShown: false,
						unmountOnBlur: true,
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
						title: "Tasks",
						headerShown: false,
						unmountOnBlur: true,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.bookmark}
								color={color}
								name="Tasks"
								focused={focused}
							/>
						),
					}}
				/>

				<Tabs.Screen
					name="submissions"
					options={{
						title: "Submissions",
						headerShown: false,
						unmountOnBlur: true,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.plus}
								color={color}
								name="Submissions"
								focused={focused}
							/>
						),
					}}
				/>

				<Tabs.Screen
					name="guest-profile"
					options={{
						title: "Profile",
						headerShown: false,
						unmountOnBlur: true,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.profile}
								color={color}
								name="Profile"
								focused={focused}
							/>
						),
					}}
				/>
			</Tabs>

		{/* <QueryClientProvider client={queryClient}>
			<GlobalProvider>
				<Stack>
					<Stack.Screen name="task-view" options={{ headerShown: false }} />
				</Stack>
			</GlobalProvider>
		</QueryClientProvider> */}

		</>

		
	);
};

export default GuestLayout;
