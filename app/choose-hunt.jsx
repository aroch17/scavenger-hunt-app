import { View, Text, Alert } from 'react-native'
import {React, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../components/FormField'
import { useQuery } from '@tanstack/react-query'
import { getHuntCodes, getHuntIdFromCode } from '../lib/supabase'
import CustomButton from '../components/CustomButton'
import { router } from 'expo-router'

const chooseHunt = () => {

  const {
		data: queryData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["huntIds"],
		queryFn: () => getHuntCodes(),
	});

  const [isSubmitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		answer: '',
	});

	const submit = async () => {
    if (form.answer === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
		else if (queryData.data.some(e => e.hunt_code === form.answer)){
      const { data } = await getHuntIdFromCode(form.answer)
      const huntId = data[0].id
      router.push(`/teams/${Number(huntId)}/choose-team`)
		}
    else{
      Alert.alert("Please enter a valid hunt code")
    }
  }


  return (
    <SafeAreaView className="bg-black h-full">
      <View className="bg-black h-full">

          <FormField 
            title = "Please Enter A Hunt Code"
            value={form.answer}
            handleChangeText ={(e) => setForm({ ...form, 
            answer: e})}
            otherStyles="mt-7"
          >
          </FormField>

          <CustomButton
          title="Submit"
          handlePress={submit}
          containerStyles="mt-7 border-2 border-white"
          isLoading={isSubmitting}
          />

      </View>
    </SafeAreaView>
    
  )
}

export default chooseHunt