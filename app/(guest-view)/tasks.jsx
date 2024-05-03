import { View, Text, ScrollView, Alert } from 'react-native'
import {React, useState} from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from '../../components/CustomButton';
import Task from '../../components/Task';

const tasks = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const submit = async () => {
    if (form.answer === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
		else {
			Alert.alert("Answer was: " + form.answer)
		}
	}

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
      <View className="w-full justify-center min-h-[85vh] px-4 my-6">
					<Text className="text-3xl font-semibold text-white mt-10 font-psemibold w-full text-center">Guest</Text>

          <Task
            title="Task 1"
            taskType="Text"
            handlePress={submit}
            containerStyles="mt-7 border-2 border-white"
            isLoading={isSubmitting}
          />

          <Task
            title="Task 2"
            taskType="Text"
            handlePress={submit}
            containerStyles="mt-7 border-2 border-white"
            isLoading={isSubmitting}
          />

          <Task
            title="Task 3"
            handlePress={submit}
            containerStyles="mt-7 border-2 border-white"
            isLoading={isSubmitting}
          />


				</View>
      </ScrollView>
		</SafeAreaView>
  )
}

export default tasks