import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { signOutUser } from "../../lib/supabase";
import { useGlobalContext } from "../../context/GlobalProvider";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
	const { username, isLoading, setUser } = useGlobalContext();
	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<View className="h-full justify-center align-center gap-3">
						<Text className="text-white">Hello {username}!</Text>
						<TouchableOpacity
							onPress={() => {
								router.push("/hunts");
							}}
							activeOpacity={0.7}
							className="bg-white p-[10px] w-full flex flex-row justify-center"
						>
							<Text className="font-pregular">Go to host view</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								signOutUser()
								setUser(null);
								router.replace("/home");
							}}
							activeOpacity={0.7}
							className="bg-white p-[10px] w-full flex flex-row justify-center"
						>
							<Text className="font-pregular">Sign Out</Text>
						</TouchableOpacity>
					</View>
					<StatusBar style="light" />
				</SafeAreaView>
			)}
		</>
	);
};

export default Profile;
