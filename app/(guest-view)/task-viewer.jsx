import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../../lib/supabase";

const TaskViewer = () => {
	const {
		data: queryData,
		isLoading,
		error,
	} = useQuery({ queryKey: ["questions"], queryFn: getQuestions });
	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<ScrollView contentContainerStyle={{height:"100%"}}>
						<View className="bg-black h-full flex justify-center items-center">
							{queryData.data.map((qa) => {
								return (
									<Text
										key={qa.id}
										className="text-white font-pregular text-xl"
									>
										{qa.data.question}
									</Text>
								);
							})}
						</View>
					</ScrollView>
				</SafeAreaView>
			)}
		</>
	);
};

export default TaskViewer;
