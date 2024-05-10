import { View, Text, ScrollView, Alert } from "react-native";
import { React, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import Task from "../../components/Task";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../lib/supabase";
import { router } from "expo-router";

const tasks = () => {
	const [isSubmitting, setSubmitting] = useState(false);
	const select = (task) => {
		// Alert.alert("Error", `${qa.id}`);
		router.push({pathname: `/task/${task.id}`, params: task});
	};
	const {
		data: queryData,
		isLoading,
		error,
	} = useQuery({ queryKey: ["tasks"], queryFn: getTasks });

	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<ScrollView contentContainerStyle={{ height: "100%" }}>
						<View className="w-full justify-center min-h-[85vh] px-4 my-6">
							<Text className="text-3xl font-semibold text-white mt-10 font-psemibold w-full text-center">
								Guest
							</Text>

							{queryData.data.map((task) => {
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
