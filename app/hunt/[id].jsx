import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getHunt } from "../../lib/supabase";
import Task from "../../components/Task";
import CustomButton from "../../components/CustomButton";

const HuntScreen = () => {
	const { id: huntId } = useLocalSearchParams();
	let hunt = null;

	const { data, isLoading, error } = useQuery({
		queryKey: ["hunt"],
		queryFn: () => getHunt(huntId),
	});

	if (!isLoading) {
		hunt = data.data[0];
	}

	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<View className="bg-black items-center">
						<Text className="text-white font-pbold text-2xl mt-20">
							{hunt.name}
						</Text>
						<Text className="mt-5 font-bold text-white text-xl">Tasks: </Text>
						{hunt.tasks.length > 0 ? (
							<FlatList
								className="max-h-[60%]"
								data={hunt.tasks}
								renderItem={({ item }) => (
									<Task
										key={item.id}
										title={item.title}
										containerStyles="mt-7 border-2 border-white"
									/>
								)}
							/>
						) : (
							<Text className="text-white font-pregular text-xl">
								No tasks to display.
							</Text>
						)}
						<CustomButton
							title="Add Task"
							containerStyles="mt-7 bg-white w-full"
							textStyles="text-black"
							handlePress={() => {
								router.replace({pathname:"/add-task", params:{huntId: huntId}});
							}}
						/>
					</View>
				</SafeAreaView>
			)}
		</>
	);
};

export default HuntScreen;
