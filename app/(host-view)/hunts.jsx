import { View, Text, FlatList } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getHunts } from "../../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import Hunt from "../../components/Hunt";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";

const Hunts = () => {
	const { user } = useGlobalContext();

	const {
		data: queryData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["userHunts"],
		queryFn: () => getHunts(user.id),
	});

	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<Text className="text-white text-2xl font-pbold mt-16">
						Your hunts:
					</Text>
					<View className="w-full px-4 my-6">
						{queryData.data.length > 0 ? (
							<FlatList
								className="max-h-[80%]"
								data={queryData.data}
								renderItem={({ item }) => (
									<Hunt
										key={item.id}
										name={item.name}
										containerStyles="mt-7 border-2 border-white"
										handlePress={() => {
											router.push(`/hunt/${item.id}`);
										}}
									/>
								)}
							/>
						) : (
							<Text className="text-white font-pregular text-xl">
								No hunts to display.
							</Text>
						)}
						<CustomButton
							title="Add Hunt"
							containerStyles="mt-7 bg-white w-full"
							textStyles="text-black"
							handlePress={() => {
								router.push("/hunt-builder");
							}}
						/>
					</View>
				</SafeAreaView>
			)}
		</>
	);
};

export default Hunts;
