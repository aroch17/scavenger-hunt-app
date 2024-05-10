import { View, Text, ScrollView, Alert } from 'react-native'
import {React, useState} from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from '../../components/CustomButton';
import Task from '../../components/Task';
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../../lib/supabase";

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
  const {
		data: queryData,
		isLoading,
		error,
	} = useQuery({ queryKey: ["questions"], queryFn: getQuestions });

  return (
    <>
    {!isLoading && (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
      <View className="w-full justify-center min-h-[85vh] px-4 my-6">
					<Text className="text-3xl font-semibold text-white mt-10 font-psemibold w-full text-center">Guest</Text>

          {queryData.data.map((qa) => {
            return (
              <Task
                key={qa.id}
                title={qa.data.question}
                handlePress={submit}
                containerStyles="mt-7 border-2 border-white"
                isLoading={isSubmitting}
                taskType="Text"
              >

              </Task>
            );
          })}
				</View>
      </ScrollView>
		</SafeAreaView>
    )}
    </>
  )
}

export default tasks