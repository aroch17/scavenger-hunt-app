import { View, Text, FlatList } from "react-native";
import { React, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Submission from "../../../components/Submission";
import { useHuntContext } from "./_layout";
import { getSubmissions, supabase } from "../../../lib/supabase";

const HuntHome = () => {
	const { huntId, hunt, isLoading } = useHuntContext()
	const [submissions, setSubmissions] = useState(hunt.submissions)

	useEffect(() => {
		const channel = supabase
			.channel("host-submissions")
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
					hunt.submissions = data.data
				}
			)
			.subscribe();
	}, []);

  return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<Text className="text-3xl font-semibold text-white mt-10 font-psemibold w-full text-center">
						Hunt submissions:
					</Text>
					<View className="w-full px-4 my-6">
						{submissions.length > 0 ? (
							<FlatList
								className="min-h-[80%] max-h-[95%]"
								data={submissions}
								renderItem={({ item }) => (
									<Submission
										key={item.id}
										submission={item.submission}
										task_id={item.task_id}
										created_at={item.created_at}
										team_id={item.team_id}
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

export default HuntHome;
