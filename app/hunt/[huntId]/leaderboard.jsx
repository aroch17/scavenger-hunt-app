import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Team from "../../../components/Team";
import { useHuntContext } from "./_layout";

const HuntLeaderboard = () => {
	const { hunt, isLoading } = useHuntContext();

	const sortedTeams = hunt.teams.slice().sort((a, b) => b.score - a.score);

	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
						<Text className="mt-10 font-bold text-white text-3xl text-center">
							Leaderboard
						</Text>
						<View className="w-full px-4 my-6">
							{sortedTeams.length > 0 ? (
								<FlatList
									className="min-h-[80%] max-h-[95%]"
									data={sortedTeams}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item, index }) => (
										<View>
											<Team
											key={index}
              				position={index + 1}
											title={item.name}
              				points={item.score}
											containerStyles="mt-7 border-2 border-white rounded-xl"
              				textStyles="text-amber-600"
											/>
										</View>
										
									)}
								/>
							) : (
								<Text className="text-white font-pregular text-xl">
									No teams to display - error.
								</Text>
							)}
						</View>
						

				</SafeAreaView>
			)}
		</>
	);
};

export default HuntLeaderboard;
