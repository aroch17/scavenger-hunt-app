import { Text, FlatList, Image } from "react-native";
import { React, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTeamContext } from "./_layout";
import { getHuntPhotoPaths, supabase } from "../../../../lib/supabase";

const submissions = () => { 
	const { huntId, hunt, isLoading, CDNUrl, imgObjects, teamId } =
		useTeamContext();
	const [submissions, setSubmissions] = useState(imgObjects.data);

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
				const data = await getHuntPhotoPaths(huntId);
				setSubmissions(data.data);
				imgObjects.data = data.data;
			}
		)
		.subscribe();

	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<Text className="text-3xl font-semibold text-white mt-10 font-psemibold w-full text-center">
						Hunt submissions
					</Text>
					{submissions.length > 0 ? (
						<FlatList
							className="min-h-[80%] max-h-[60%]"
							data={submissions}
							renderItem={({ item }) => (
								<Image
									key={item.id}
									style={{
										width: 300,
										height: 300,
										resizeMode: "contain",
									}}
									source={{
										uri: `${CDNUrl}/${huntId}/${item.team_id}/${item.image_uuid}`,
									}}
								/>
							)}
						/>
					) : (
						<Text className="text-white font-pregular text-xl">
							No submissions to display.
						</Text>
					)}
				</SafeAreaView>
			)}
		</>
	);
};

export default submissions;
