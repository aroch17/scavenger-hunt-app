import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useTeamContext } from './_layout';
import Submission from '../../../../components/Submission';

const profile = () => {

	const { huntId, hunt, teamId, team, isLoading } = useTeamContext()

	const teamSubmissions = hunt.submissions.filter(submission => submission.team_id == teamId);

  return (
		<>
		{!isLoading && (
			<SafeAreaView className="bg-black h-full">
				<Text className="text-3xl font-semibold text-white mt-10 font-psemibold w-full text-center">
					Your submissions:
				</Text>
				<View className="w-full px-4 my-6">
					{teamSubmissions.length > 0 ? (
						<FlatList
							className="min-h-[80%] max-h-[95%]"
							data={teamSubmissions}
							renderItem={({ item }) => (
								<Submission
									key={item.id}
									submission={item.submission}
									task_id={item.task_id}
									team_id = {item.team_id}
									created_at={item.created_at}
									user_id={item.user_id}
									containerStyles="mt-7 border-2 border-white"
									textStyles="text-white"
								/>
							)}
						/>
					) : (
						<Text className="text-white font-pregular text-xl">
							No submissions to display.
						</Text>
					)}
				</View>
			</SafeAreaView>
		)}
	</>
  )
}

export default profile