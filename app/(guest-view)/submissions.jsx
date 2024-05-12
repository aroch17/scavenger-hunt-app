import { View, Text, ScrollView, Alert } from 'react-native'
import { React, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getSubmissions } from "../../lib/supabase";
import Submission from "../../components/Submission";


const submissions = () => {

	const {
		data: queryData,
		isLoading,
		error,
	} = useQuery({ queryKey: ["submissions"], queryFn: getSubmissions });

  return (
		<>
		{!isLoading && (
			<SafeAreaView className="bg-black h-full">
				<ScrollView contentContainerStyle={{ height: "100%" }}>
					<View className="w-full justify-center min-h-[85vh] px-4 my-6">
						<Text className="text-3xl font-semibold text-white mt-10 font-psemibold w-full text-center">
							Guest
						</Text>

						{queryData.data.map((submission) => {
							return (
								<Submission
									key={submission.id}
									submission={submission.submission}
									task_id={submission.task_id}
									created_at={submission.created_at}
									user_id={submission.user_id}
									containerStyles="mt-7 border-2 border-white"
									textStyles="text-white"
								/>
							);
						})}
					</View>
				</ScrollView>
			</SafeAreaView>
		)}
	</>
  )
}

export default submissions