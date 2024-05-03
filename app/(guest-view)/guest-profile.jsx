import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

const profile = () => {
  return (
    <SafeAreaView className="bg-black h-full">
			<View>
				<Text className="text-white">Profile</Text>
			</View>
		</SafeAreaView>
  )
}

export default profile