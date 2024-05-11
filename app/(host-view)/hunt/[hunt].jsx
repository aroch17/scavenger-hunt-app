import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getHunt } from "../../../lib/supabase";

const HuntScreen = () => {
	const { hunt:huntId } = useLocalSearchParams();
  let hunt = null

	const { data, isLoading, error } = useQuery({
		queryKey: ["hunt"],
		queryFn: () => getHunt(huntId),
	});

  if (!isLoading) {
    hunt = data.data[0]
  }

  // TODO: Show hunt tasks
  // TODO: Add option to add tasks
	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<View className="bg-black h-full items-center">
						<Text className="text-white font-pbold text-2xl mt-20">
							{hunt.name} 
						</Text>
					</View>
				</SafeAreaView>
			)}
		</>
	);
};

export default HuntScreen;
