import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import {
	changeSubmissionStatus,
	getSubmission,
	updateTeamScore,
} from "../../lib/supabase";
import CustomButton from "../../components/CustomButton";

const viewSubmission = () => {
	const CDNUrl =
		"https://psdsdmptskceretwhxxt.supabase.co/storage/v1/object/public/submissions";
	const { submissionId } = useLocalSearchParams();
	let submission = null;

	const { data, isLoading, error } = useQuery({
		queryKey: ["submission"],
		queryFn: () => getSubmission(submissionId),
	});

	if (!isLoading && !error) {
		submission = data.data[0];
	}
	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<ScrollView>
						<View className="text-center">
							<Text className="text-white text-2xl font-pbold">
								{submission.tasks.title}
							</Text>
							<Text className="text-white font-pregular text-xl">
								{submission.tasks.prompt}
							</Text>
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
								<Text className="text-white font-pregular text-xl">
									{submission.tasks.answer}
								</Text>
							)}
							{submission.requires_approval ? (
								<View>
									<CustomButton
										title="Approve"
										containerStyles="mt-7 border-2 border-green-600 w-full"
										handlePress={async () => {
											await changeSubmissionStatus(submission.id, true);
											await updateTeamScore({
												team_id: submission.team_id,
												points: submission.tasks.points,
											});
											router.push("../");
										}}
									/>
									<CustomButton
										title="Reject"
										containerStyles="mt-2 border-2 border-red-600 w-full"
										handlePress={async () => {
											await changeSubmissionStatus(submission.id, false);
											router.push("../");
										}}
									/>
								</View>
							) : (
								<View>
									<Text className="text-white font-pbold text-xl">
										Status:{" "}
									</Text>
									{submission.is_approved ? (
										<Text className="text-green-600 font-pregular text-xl">
											Approved
										</Text>
									) : (
										<Text className="text-red-600 font-pregular text-xl">
											Rejected
										</Text>
									)}
								</View>
							)}
						</View>
					</ScrollView>
				</SafeAreaView>
			)}
		</>
	);
};

export default viewSubmission;
