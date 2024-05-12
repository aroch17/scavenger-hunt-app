import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getHunts } from "../../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";

const Hunts = () => {
	const { user } = useGlobalContext();

	const { data: queryData, isLoading, error } = useQuery({
		queryKey: ["userHunts"],
		queryFn: async () => {
			const { data, error } = await getHunts(user.id);
			return { data, error };
		},
	});

	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<ScrollView contentContainerStyle={{ height: "100%" }}>
						<View className="w-full justify-center min-h-[85vh] px-4 my-6">
            <Text className="text-white text-2xl font-pbold">Your hunts:</Text>
							{queryData.data.map((hunt) => {
								return (
                  // TODO: Make hunt component and redirect to hunt page when clicked
									<Text key={hunt.id} className="text-white for-pregular">{hunt.name}</Text>
								);
							})}
						</View>
					</ScrollView>
				</SafeAreaView>
			)}
		</>
	);
};

export default Hunts;
