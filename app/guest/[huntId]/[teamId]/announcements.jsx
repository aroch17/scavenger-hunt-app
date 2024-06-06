import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { useTeamContext } from './_layout'
import Announcement from '../../../../components/Announcement'


const announcements = () => {
  const { huntId, hunt, teamId, team, isLoading } = useTeamContext()

  return (
    <>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<View className="bg-black items-center">
						<Text className="mt-5 font-bold text-white text-2xl mt-20">
							Announcements:
						</Text>
						{hunt.announcements.length > 0 ? (
							<FlatList
								className="min-h-[80%] max-h-[60%]"
								data={hunt.announcements}
								renderItem={({ item }) => (
									<Announcement
										key={item.id}
										title={item.title}
                    description={item.description}
										containerStyles="mt-7 border-2 border-white"
									/>
								)}
							/>
						) : (
							<Text className="text-white font-pregular text-xl">
								No announcements to display.
							</Text>
						)}
					</View>
				</SafeAreaView>
			)}
		</>
  )
}

export default announcements