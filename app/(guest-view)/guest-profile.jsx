import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import DropdownInput from '../../components/DropdownInput';

const profile = () => {
  return (
    <SafeAreaView className="bg-black h-full">
			<View>
				<Text className="text-white">Profile</Text>

				<DropdownInput
				data=""
				otherStyles=""
				title="Choose Option"
				>
				</DropdownInput>
			</View>
		</SafeAreaView>
  )
}

export default profile