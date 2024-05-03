import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Host = () => {
	return (
		<SafeAreaView className="bg-black h-full">
			<View className="bg-black h-full items-center">
				<Text className="text-white font-pbold text-2xl mt-20">Add Question</Text>
			</View>
			<StatusBar style="light"/>
		</SafeAreaView>
	);
};

export default Host;