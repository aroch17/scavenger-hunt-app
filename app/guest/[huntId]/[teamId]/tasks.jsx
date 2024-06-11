import { View, Text, ScrollView, Alert, FlatList } from "react-native";
import { React, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Task from "../../../../components/Task";
import { getTasks, supabase } from "../../../../lib/supabase";
import { router } from "expo-router";
import { useTeamContext } from "./_layout";


const tasks = () => {
	const { huntId, hunt, teamId, team, isLoading } = useTeamContext()

	const [isSubmitting, setSubmitting] = useState(false);
	const [tasks, setTasks] = useState(hunt.tasks)
	const select = (task) => {
		router.push(`/task/${teamId}/${task.id}`);
	};

	useEffect(() => {
		const channel = supabase
			.channel("custom")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "tasks",
				},
				async (payload) => {
					const data = await getTasks(huntId)
					setTasks(data.data)
					hunt.tasks = data.data
				}
			)
			.subscribe();
	}, []);


	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<View className="w-full px-4 my-6">
						<Text className="text-3xl font-semibold text-white mt-10 font-psemibold w-full text-center">Tasks:</Text>
						{tasks.length > 0 ? (
							<FlatList
								className="min-h-[80%] max-h-[95%]"
								data={tasks}
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
