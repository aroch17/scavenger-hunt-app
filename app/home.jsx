import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalProvider";
import CustomButton from "../components/CustomButton";

const Home = () => {
	const { isLoading, isLoggedIn, userJoinedHuntId, userJoinedHuntTeamId } = useGlobalContext();

	useEffect(() => {
		if (userJoinedHuntTeamId) router.push(`guest/${userJoinedHuntId}/${userJoinedHuntTeamId}`)
	}, []);

	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<ScrollView contentContainerStyle={{ height: "100%" }}>
						<View className="bg-black h-full flex justify-center items-center">
							<Text className="text-white text-3xl font-pbold">
								Side Quests
							</Text>
							<Text className="text-white text-xl font-pbold mb-4">
								Ready to go on your next quest?
							</Text>
							<CustomButton
								title="Join a hunt"
								containerStyles="mt-7 bg-white w-[80%] "
								textStyles="text-black text-xl"
								handlePress={() => {
									router.push("/choose-hunt");
								}}
							/>
							<CustomButton
								title="Create a hunt"
								containerStyles="mt-7 bg-white w-[80%]"
								textStyles="text-black text-xl"
								handlePress={() => {
									if (!isLoggedIn) router.push("/sign-in");
									else router.push("hunts");
								}}
							/>
						</View>
					</ScrollView>
					<StatusBar style="light" />
				</SafeAreaView>
			)}
		</>
	);
};

export default Home;
