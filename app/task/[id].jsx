import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DisplayTask from "../../components/DisplayTask";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getTask, getHuntId } from "../../lib/supabase";

const viewTask = () => {
	const {id: taskId} = useLocalSearchParams();
	
	let task = null
	
	// should consider implementing a cache for this
	const { data:taskData, isLoading:taskIsLoading, taskError } = useQuery({
		queryKey: ["task"],
		queryFn: () => getTask(taskId)
	});

	if (!taskIsLoading && !taskError) {
		task = taskData.data[0]
		huntId = task.hunt_id
	}


	return (
		<>
			{!taskIsLoading && (
				<SafeAreaView className="bg-black h-full">
					<ScrollView contentContainerStyle={{ height: "100%" }}>
						<View>
							<DisplayTask
								id = {task.id}
								title={task.title}
								prompt={task.prompt}
								answer={task.answer}
								huntId = {huntId}
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
