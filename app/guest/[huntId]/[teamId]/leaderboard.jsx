import { View, Text, ScrollView, Alert } from 'react-native'
import {React, useState} from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useTeamContext } from './_layout';
import Team from '../../../../components/Team';

const Guest = () => {
	const { huntId, hunt, teamId, team, isLoading } = useTeamContext()

  return (

		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<ScrollView contentContainerStyle={{ height: "100%" }}>
						<View className="bg-black items-center">
							<Text className="text-3xl font-semibold text-white mt-10 font-psemibold w-full text-center">{team.name}</Text>
							<Text className="mt-10 font-bold text-white text-3xl">Leaderboard</Text>
						<Team
							key="1"
              position="1"
							title="Team 1"
              points="30"
							containerStyles="mt-7 border-2 border-white rounded-xl"
              textStyles="text-yellow-500"
						/>
						<Team
							key="2"
              position="2"
							title="Team 2"
              points="27"
							containerStyles="mt-7 border-2 border-white rounded-xl"
              textStyles="text-stone-500"
						/>
						<Team
							key="3"
              position="3"
							title="Team 3"
              points="25"
							containerStyles="mt-7 border-2 border-white rounded-xl"
              textStyles="text-amber-600"
						/>
					</View>

					</ScrollView>
				</SafeAreaView>
			)}
				
		</>
    
  )
}

export default Guest