import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

const submissions = () => {
  return (
    <SafeAreaView className="bg-black h-full">
			<View>
				<Text className="text-white">Submissions</Text>
			</View>
		</SafeAreaView>
  )
}

export default submissions