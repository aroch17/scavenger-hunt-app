import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from '../../components/FormField';

const Guest = () => {
  return (
    <SafeAreaView className="bg-black h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[85vh] px-4 my-6">
					<Text className="text-white">Guest</Text>
					<FormField />
				</View>
			</ScrollView>
		</SafeAreaView>
  )
}

export default Guest