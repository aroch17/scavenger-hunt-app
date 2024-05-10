import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import DisplayTask from '../../components/DisplayTask';
import { useLocalSearchParams } from 'expo-router';

const viewTask = () => {
  const task = useLocalSearchParams();

  console.log(task)

  return (
    <SafeAreaView className="bg-black h-full">
			<View>

				
				<DisplayTask
				title={task.title}
				prompt={task.prompt}
				answer={task.answer}
				otherStyles="mt-7"
				textStyles="text-base text-white font-pmedium"
				taskType={task.task_type}
				/>
			</View>
		</SafeAreaView>
  )
}

export default viewTask