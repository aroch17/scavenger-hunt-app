import { View, Text, ScrollView, Alert, FlatList } from 'react-native'
import {React, useState} from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useTeamContext } from './_layout';
import Team from '../../../../components/Team';

const Guest = () => {
	const { huntId, hunt, teamId, team, isLoading } = useTeamContext()

	console.log(hunt.teams)

  return (

		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
							<Text className="text-3xl font-semibold text-white mt-10 font-psemibold w-full text-center">{team.name}</Text>
							<Text className="mt-10 font-bold text-white text-3xl text-center">Leaderboard</Text>
						{/* <Team
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
						/> */}
					<View className="w-full px-4 my-6">
							{hunt.teams.length > 0 ? (
								<FlatList
									className="min-h-[80%] max-h-[95%]"
									data={hunt.teams}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item, index }) => (
										<View>
											<Team
											key={index}
              				position={index + 1}
											title={item.name}
              				points={item.score}
											containerStyles="mt-7 border-2 border-white rounded-xl"
              				textStyles="text-amber-600"
											/>
										</View>
										
									)}
								/>
							) : (
								<Text className="text-white font-pregular text-xl">
									No teams to display - error.
								</Text>
							)}
						</View>
				</SafeAreaView>
			)}
				
		</>
    
  )
}

export default Guest