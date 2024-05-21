import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import Task from "../../../components/Task";
import CustomButton from "../../../components/CustomButton";
import { useHuntContext } from "./_layout";


const HuntTeams = () => {
  const { hunt, isLoading } = useHuntContext()

  return (
    <>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<View className="bg-black items-center">
						<Text className="text-white font-pbold text-2xl mt-20">
							{hunt.name}
						</Text>
						<Text className="mt-5 font-bold text-white text-xl">Teams: </Text>
						{hunt.teams.length > 0 ? (
							<FlatList
								className="max-h-[60%]"
								data={hunt.teams}
								renderItem={({ item }) => (
									<Task
										key={item.id}
										title={item.name}
										containerStyles="mt-7 border-2 border-white"
									/>
								)}
							/>
						) : (
							<Text className="text-white font-pregular text-xl">
								No teams added yet.
							</Text>
						)}
            {/* should hosts be able to add teams? */}
					</View>
				</SafeAreaView>
			)}
		</>
  )
}

export default HuntTeams