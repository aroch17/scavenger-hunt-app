import { View, Text, ScrollView, Alert, FlatList } from "react-native";
import { React, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../../components/CustomButton";
import Task from "../../../../components/Task";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../../../lib/supabase";
import { router } from "expo-router";
import { useTeamContext } from "./_layout";


const tasks = () => {
	const [isSubmitting, setSubmitting] = useState(false);
	const select = (task) => {
		router.push(`/task/${task.id}`);
	};

	const { huntId, hunt, teamId, team, isLoading } = useTeamContext()


	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<View className="w-full px-4 my-6">
						{hunt.tasks.length > 0 ? (
							<FlatList
								className="max-h-[95%]"
								data={hunt.tasks}
								renderItem={({ item }) => (
									<Task
										key={item.id}
										title={item.title}
										handlePress={() => select(item)}
										containerStyles="mt-7 border-2 border-white"
										isLoading={isSubmitting}
										taskType={item.task_type}
									/>
								)}
							/>
						) : (
							<View>
								<Text className="text-white">No tasks to display</Text>
							</View>
						)}
						</View>
				</SafeAreaView>
			)}
		</>
	);
};

export default tasks;
