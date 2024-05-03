import { View, Text, ScrollView } from 'react-native'
import {React, useState} from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from '../../components/FormField';

const Guest = () => {
	const [form, setForm] = useState({
		answer: '',
	});


  return (
    <SafeAreaView className="bg-black h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[85vh] px-4 my-6">
					<Text className="text-white justify-center">Guest</Text>
					<FormField 
						title="Answer"
						value={form.answer}
						handleChangeText ={(e) => setForm({ ...form, 
						answer: e})}
						otherStyles="mt-7"
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
  )
}

export default Guest