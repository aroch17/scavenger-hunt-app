import { View, Text, FlatList, Switch } from "react-native";
import { React, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Task from "../../../../components/Task";
import { getTasks, supabase } from "../../../../lib/supabase";
import { router } from "expo-router";
import { useTeamContext } from "./_layout";

const tasks = () => {
	const { huntId, hunt, teamId, team, isLoading } = useTeamContext();

	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	const [tasks, setTasks] = useState(hunt.tasks);
	const select = (task) => {
		router.push(`/task/${teamId}/${task.id}`);
	};

	const channel = supabase
		.channel("guest-tasks")
		.on(
			"postgres_changes",
			{
				event: "*",
				schema: "public",
				table: "tasks",
			},
			async (payload) => {
				const data = await getTasks(huntId);
				setTasks(data.data);
				hunt.tasks = data.data;
			}
		)
		.subscribe();

	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<View className="w-full px-4 my-6">
						<Text className="text-3xl font-semibold text-white mt-10 font-psemibold w-full text-center">
							Tasks:
						</Text>
						<View className="flex flex-row justify-center mt-5">
							<Text className="text-white text-2xl font-pregular">
								Show Completed:{" "}
							</Text>
							<Switch
								trackColor={{ false: "#767577", true: "#81b0ff" }}
								thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
								ios_backgroundColor="#3e3e3e"
								onValueChange={toggleSwitch}
								value={isEnabled}
							/>
						</View>
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
