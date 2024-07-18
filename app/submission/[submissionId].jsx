import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";


const viewSubmission = () => {
	const { submissionId } = useLocalSearchParams();

	// let task = null

	// // should consider implementing a cache for this
	// const { data:taskData, isLoading:taskIsLoading, error:taskError } = useQuery({
	// 	queryKey: ["task"],
	// 	queryFn: () => getTask(taskId)
	// });

	// if (!taskIsLoading && !taskError) {
	// 	task = taskData.data[0]
	// 	huntId = task.hunt_id
	// }

	return (
		<>
			{
				<SafeAreaView className="bg-black h-full">
					<ScrollView>
						<View>
							<Text className="text-white">{submissionId}</Text>
						</View>
					</ScrollView>
				</SafeAreaView>
			}
		</>
	);
};

export default viewSubmission;
