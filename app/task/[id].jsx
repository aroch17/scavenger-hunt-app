import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DisplayTask from "../../components/DisplayTask";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getTask } from "../../lib/supabase";

const viewTask = () => {
	const {id: taskId} = useLocalSearchParams();
	let task = null
	
	// should consider implementing a cache for this
	const { data, isLoading, error } = useQuery({
		queryKey: ["task"],
		queryFn: () => getTask(taskId),
	});

	if (!isLoading && !error) {
		task = data.data[0]
	}

	console.log(task)

	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<ScrollView contentContainerStyle={{ height: "100%" }}>
						<View>
							<DisplayTask
								title={task.title}
								prompt={task.prompt}
								answer={task.answer}
								otherStyles="mt-7"
								textStyles="text-base text-white font-pmedium"
								taskType={task.task_type}
							/>
						</View>
					</ScrollView>
				</SafeAreaView>
			)}
		</>
	);
};

export default viewTask;
