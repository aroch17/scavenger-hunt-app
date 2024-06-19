import { Tabs, useLocalSearchParams } from "expo-router";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { getHunt, getHuntPhotoPaths, getTeam } from "../../../../lib/supabase";
import { Ionicons } from '@expo/vector-icons';

const CDNUrl = "https://psdsdmptskceretwhxxt.supabase.co/storage/v1/object/public/submissions"

const queryClient = new QueryClient();
const Context = createContext();
export const useTeamContext = () => useContext(Context);

const GuestLayout = () => {
	const { huntId, teamId } = useLocalSearchParams();

	let hunt = null;
	const { data:huntData, isLoading: huntIsLoading, error:huntError } = useQuery({
		queryKey: ["hunt"],
		queryFn: () => getHunt(huntId),
	});

	if (!huntIsLoading) {
		hunt = huntData.data[0];
	}

	let team = null;
	const { data:teamData, isLoading: teamIsLoading, error:teamError } = useQuery({
		queryKey: ["team"],
		queryFn: () => getTeam(teamId),
	});

	if (!teamIsLoading) {
		team = teamData.data[0];
	}

	let imgObjects = null
	const { data, isLoading: imgIsLoading, error } = useQuery({
		queryKey: ["imgs"],
		queryFn: () => getHuntPhotoPaths(huntId),
	});

	if (!imgIsLoading) {
		imgObjects = data
	}

	const isLoading = huntIsLoading || teamIsLoading || imgIsLoading;

	return (
		<>
		{!isLoading && (
				<Context.Provider value={{ huntId, hunt, teamId, team, isLoading, CDNUrl, imgObjects }}>
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
							name="leaderboard"
							options={{
								title: "Leaderboard",
								headerShown: false,
								unmountOnBlur: true,
								tabBarLabel: 'Leaderboard',
								tabBarIcon: ({ color, focused, size }) => (
									<Ionicons
										name={focused ? "trophy" : "trophy-outline"}
										color={color}
										focused={focused}
										size = {size}
									/>
								),
							}}
						/>

						<Tabs.Screen
							name="announcements"
							options={{
								title: "Announcements",
								headerShown: false,
								unmountOnBlur: true,
								tabBarLabel: 'Announcements',
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
							name="tasks"
							options={{
								title: "Tasks",
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
							name="submissions"
							options={{
								title: "Submissions",
								headerShown: false,
								unmountOnBlur: true,
								tabBarLabel: 'Submissions',
								tabBarIcon: ({ color, focused, size }) => (
									<Ionicons
										color={color}
										name={focused ? "checkmark-done" : 'checkmark-done-outline'}
										size = {size}
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
								tabBarLabel: 'Profile',
								tabBarIcon: ({ color, focused, size }) => (
									<Ionicons
										color={color}
										name={focused ? "person" : "person-outline"}
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

export default GuestLayout;
