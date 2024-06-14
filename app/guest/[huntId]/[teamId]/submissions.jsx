import { View, Text, FlatList, Image, ScrollView } from "react-native";
import { React, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Submission from "../../../../components/Submission";
import { useTeamContext } from "./_layout";
import { getSubmissions, supabase } from "../../../../lib/supabase";

const submissions = () => {
	const { huntId, hunt, isLoading, CDNUrl, imgObjects, teamId } =
		useTeamContext();
	const [submissions, setSubmissions] = useState(hunt.submissions);

	useEffect(() => {
		const channel = supabase
			.channel("guest-submissions")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "submissions",
				},
				async (payload) => {
					const data = await getSubmissions(huntId);
					setSubmissions(data.data);
					hunt.submissions = data.data;
				}
			)
			.subscribe();
	}, []);
	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<Text className="text-3xl font-semibold text-white mt-10 font-psemibold w-full text-center">
						Hunt submissions
					</Text>
					<ScrollView className="w-full px-4 my-6">
						{/* {submissions.length > 0 ? (
								<FlatList
									className="min-h-[80%] max-h-[95%]"
									data={submissions}
									renderItem={({ item }) => (
										<Submission
											key={item.id}
											submission={item.submission}
											task_id={item.task_id}
											team_id={item.team_id}
											created_at={item.created_at}
											containerStyles="mt-7 border-2 border-white"
											textStyles="text-white"
										/>
									)}
								/>
							) : (
								<Text className="text-white font-pregular text-xl">
									No submissions to display.
								</Text>
							)} */}
						{imgObjects.map((imgObject) => (
							<Image
								key={imgObject.id}
								style={{
									width: 300,
									height: 300,
									resizeMode: "contain",
								}}
								source={{
									uri: `${CDNUrl}/${huntId}/${imgObject.team_id}/${imgObject.uuid}`,
								}}
							/>
						))}
					</ScrollView>
				</SafeAreaView>
			)}
		</>
	);
};

export default submissions;
