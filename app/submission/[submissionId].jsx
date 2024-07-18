import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getSubmission } from "../../lib/supabase";

const viewSubmission = () => {
	const CDNUrl = "https://psdsdmptskceretwhxxt.supabase.co/storage/v1/object/public/submissions"
	const { submissionId } = useLocalSearchParams();
	// TODO: Show image submission to host
	let submission = null;

	const { data, isLoading, error } = useQuery({
		queryKey: ["submission"],
		queryFn: () => getSubmission(submissionId),
	});

	if (!isLoading && !error) {
		submission = data.data[0];
	}
	// TODO: Enable host to approve/reject submission
	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<ScrollView>
						<View className="text-center">
							<Text className="text-white text-2xl font-pbold">
								{submission.tasks.title}
							</Text>
							<Text className="text-white font-pregular text-xl">{submission.tasks.prompt}</Text>
							<Text className="text-white text-xl">Submission:</Text>
							{submission.image_uuid ? (
								<Image
									key={submission.id}
									style={{
										width: 300,
										height: 300,
										resizeMode: "contain",
									}}
									source={{
										uri: `${CDNUrl}/${submission.hunt_id}/${submission.team_id}/${submission.image_uuid}`,
									}}
								/>
							) : (
								<Text className="text-white font-pregular text-xl">{submission.tasks.answer}</Text>
							)}
						</View>
					</ScrollView>
				</SafeAreaView>
			)}
		</>
	);
};

export default viewSubmission;
