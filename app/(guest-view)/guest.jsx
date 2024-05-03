import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Guest = () => {
	return (
		<SafeAreaView className="bg-black h-full">
			<View className="bg-black h-full items-center">
				<Text className="text-white text-2xl font-pbold mt-20">Available Questions: </Text>
			</View>
			<StatusBar style="light"/>
		</SafeAreaView>
	)
}

export default Guest