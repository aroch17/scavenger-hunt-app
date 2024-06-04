import { View, Text, ScrollView, Alert } from "react-native";
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
					<ScrollView contentContainerStyle={{ height: "100%" }}>
						<View className="w-full justify-center min-h-[85vh] px-4 my-6">
							{hunt.tasks.map((task) => {
								return (
									<Task
										key={task.id}
										title={task.title}
										handlePress={() => select(task)}
										containerStyles="mt-7 border-2 border-white"
										isLoading={isSubmitting}
										taskType={task.task_type}
									/>
								);
							})}
						</View>
					</ScrollView>
				</SafeAreaView>
			)}
		</>
	);
};

export default tasks;
