import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../../../components/CustomButton";
import { supabase } from "../../../lib/supabase";
import { useHuntContext } from "./_layout";
import Announcement from "../../../components/Announcement";

const HuntAnnouncements = () => {
	const { huntId, hunt, isLoading } = useHuntContext();
	const [announcements, setAnnouncements] = useState(hunt.announcements)
	console.log(announcements)

	useEffect(() => {
		const channel = supabase
			.channel("custom")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "announcements",
				},
				(payload) => {
					const { new:newAnnouncement} = payload
					if (!isLoading) {
						console.log("updating")
						setAnnouncements([...announcements, newAnnouncement])
					}
				}
			)
			.subscribe();
	}, []);
	
	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<View className="bg-black items-center">
						<Text className="mt-5 font-bold text-white text-2xl mt-20">
							Announcements:
						</Text>
						{announcements.length > 0 ? (
							<FlatList
								className="max-h-[60%]"
								data={announcements}
								renderItem={({ item }) => (
									<Announcement
										key={item.id}
										title={item.title}
										description={item.description}
										containerStyles="mt-7 border-2 border-white"
									/>
								)}
							/>
						) : (
							<Text className="text-white font-pregular text-xl">
								No announcements to display.
							</Text>
						)}
						<CustomButton
							title="Add Announcement"
							containerStyles="mt-7 bg-white w-full"
							textStyles="text-black"
							handlePress={() => {
								router.replace({
									pathname: "/add-announcement",
									params: { huntId: huntId },
								});
							}}
						/>
					</View>
				</SafeAreaView>
			)}
		</>
	);
};

export default HuntAnnouncements;
