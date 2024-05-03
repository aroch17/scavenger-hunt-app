import { View, Text, ScrollView } from 'react-native'
import {React, useState} from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

const Guest = () => {
	const [isSubmitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		answer: '',
	});

	const submit = async () => {
    if (form.answer === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
	}

  return (
    <SafeAreaView className="bg-black h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[85vh] px-4 my-6">
					<Text className="text-2xl font-semibold text-white mt-10 font-psemibold w-full text-center">Guest</Text>
					<FormField 
						title="Put Answer Here"
						value={form.answer}
						handleChangeText ={(e) => setForm({ ...form, 
						answer: e})}
						otherStyles="mt-7"
					/>

					<CustomButton
						title="Submit"
						handlePress={submit}
						containerStyles="mt-7"
						isLoading={isSubmitting}
					/>

					<View className="flex justify-center pt-5 flex-row gap-2">
						<Text classname="text-lg text-gray-100 font-pregular">Hello</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
  )
}

export default Guest