import { Redirect, Tabs, useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";
import { icons } from "../../../../constants";
import { SplashScreen, Stack } from "expo-router";
import { GlobalProvider } from "../../../../context/GlobalProvider";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { getHunt, getTeam } from "../../../../lib/supabase";

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

const Context = createContext();
export const useTeamContext = () => useContext(Context);

const GuestLayout = () => {

	const { huntId, teamId } = useLocalSearchParams();

	let hunt = null;

	const { data:huntData, isLoading: huntIsLoading, huntError } = useQuery({
		queryKey: ["hunt"],
		queryFn: () => getHunt(huntId),
	});

	if (!huntIsLoading) {
		hunt = huntData.data[0];
	}

	let team = null;

	const { data:teamData, isLoading: teamIsLoading, teamError } = useQuery({
		queryKey: ["team"],
		queryFn: () => getTeam(teamId),
	});

	if (!teamIsLoading) {
		team = teamData.data[0];
	}
	
	const isLoading = huntIsLoading || teamIsLoading;

	return (
		<>
		{!isLoading && (
				<Context.Provider value={{ huntId, hunt, teamId, team, isLoading }}>
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
			</Context.Provider>
			)}
		</>

		
	);
};

export default GuestLayout;
