import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Team from "../../../components/Team";
import { useHuntContext } from "./_layout";

const HuntLeaderboard = () => {
	const { hunt, isLoading } = useHuntContext();

	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<View className="bg-black items-center">
						<Text className="mt-10 font-bold text-white text-3xl">
							Leaderboard
						</Text>
						<Team
							key="1"
              position="1"
							title="Team 1"
              points="30"
							containerStyles="mt-7 border-2 border-white rounded-xl"
              textStyles="text-yellow-500"
						/>
						<Team
							key="2"
              position="2"
							title="Team 2"
              points="27"
							containerStyles="mt-7 border-2 border-white rounded-xl"
              textStyles="text-stone-500"
						/>
						<Team
							key="3"
              position="3"
							title="Team 3"
              points="25"
							containerStyles="mt-7 border-2 border-white rounded-xl"
              textStyles="text-amber-600"
						/>
					</View>
				</SafeAreaView>
			)}
		</>
	);
};

export default HuntLeaderboard;
