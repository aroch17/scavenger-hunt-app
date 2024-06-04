import { View, Text, ScrollView, Alert } from 'react-native'
import {React, useState} from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useTeamContext } from './_layout';

const Guest = () => {
	const { huntId, hunt, teamId, team, isLoading } = useTeamContext()

  return (

		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<ScrollView contentContainerStyle={{ height: "100%" }}>
						<View className="w-full justify-center min-h-[85vh] px-4 my-6">
							<Text className="text-3xl font-semibold text-white mt-10 font-psemibold w-full text-center">{team.name}</Text>
						</View>
					</ScrollView>
				</SafeAreaView>
			)}
				
		</>
    
  )
}

export default Guest