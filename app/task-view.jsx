import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import DisplayTask from '../components/DisplayTask';

const viewTask = () => {
  return (
    <SafeAreaView className="bg-black h-full">
			<View>
				<DisplayTask
				title="TITLE"
				prompt="PROMPT"
				answer="ANSWER"
				otherStyles="mt-7"
				textStyles="text-base text-white font-pmedium"
				taskType="Text"
				/>
			</View>
		</SafeAreaView>
  )
}

export default viewTask