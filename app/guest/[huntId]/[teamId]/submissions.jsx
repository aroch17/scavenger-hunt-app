import { View, Text, ScrollView, Alert, FlatList } from "react-native";
import { React, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getSubmissions } from "../../../../lib/supabase";
import Submission from "../../../../components/Submission";
import { useTeamContext } from "./_layout";

const submissions = () => {
	// const {
	// 	data: queryData,
	// 	isLoading,
	// 	error,
	// } = useQuery({ queryKey: ["submissions"], queryFn: getSubmissions });

	const { huntId, hunt, teamId, team, isLoading } = useTeamContext()

	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<Text className="text-3xl font-semibold text-white mt-10 font-psemibold w-full text-center">
						Your submissions:
					</Text>
					<View className="w-full px-4 my-6">
						{hunt.submissions.length > 0 ? (
							<FlatList
								className="max-h-[95%]"
								data={queryData.data}
								renderItem={({ item }) => (
									<Submission
										key={item.id}
										submission={item.submission}
										task_id={item.task_id}
										created_at={item.created_at}
										user_id={item.user_id}
										containerStyles="mt-7 border-2 border-white"
										textStyles="text-white"
									/>
								)}
							/>
						) : (
							<Text className="text-white font-pregular text-xl">
								No submissions to display.
							</Text>
						)}
					</View>
				</SafeAreaView>
			)}
		</>
	);
};

export default submissions;
