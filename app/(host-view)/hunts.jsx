import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getHunts } from "../../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import Hunt from "../../components/Hunt";
import { router } from "expo-router";

const Hunts = () => {
	const { user } = useGlobalContext();

	const {
		data: queryData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["userHunts"],
		queryFn: () => getHunts(user.id)
	});

	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<Text className="text-white text-2xl font-pbold mt-10">Your hunts:</Text>
					<ScrollView>
						<View className="w-full justify-center min-h-[85vh] px-4 my-6">
							{queryData.data.length > 0 ? (
								queryData.data.map((hunt) => {
									return (
										<Hunt
											key={hunt.id}
											name={hunt.name}
											containerStyles="mt-7 border-2 border-white"
											handlePress={() => {
												router.push(`/hunt/${hunt.id}`);
											}}
										/>
									);
								})
							) : (
								<Text className="text-white font-pregular text-">
									No hunts to display.
								</Text>
							)}
						</View>
					</ScrollView>
				</SafeAreaView>
			)}
		</>
	);
};

export default Hunts;
