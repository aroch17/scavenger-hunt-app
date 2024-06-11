import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import Task from "../../../components/Task";
import CustomButton from "../../../components/CustomButton";
import { useHuntContext } from "./_layout";
import { getTasks, supabase } from "../../../lib/supabase";


const HuntTasks = () => {
  const { huntId, hunt, isLoading } = useHuntContext()
	const [tasks, setTasks] = useState(hunt.tasks)

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
				}
			)
			.subscribe();
	}, []);

  return (
    <>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<View className="bg-black items-center">
						<Text className="text-white font-pbold text-2xl mt-20">
							{hunt.name}
						</Text>
						<Text className="mt-5 font-bold text-white text-xl">Tasks: </Text>
						{tasks.length > 0 ? (
							<FlatList
								className="max-h-[60%]"
								data={tasks}
								renderItem={({ item }) => (
									<Task
										key={item.id}
										title={item.title}
										containerStyles="mt-7 border-2 border-white"
										taskType = {item.task_type}
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
  )
}

export default HuntTasks