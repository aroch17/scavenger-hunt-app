import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useTeamContext } from './_layout'

const announcements = () => {
  const { huntId, hunt, teamId, team, isLoading } = useTeamContext()

  return (
    <>
      {!isLoading && (
        <SafeAreaView className="bg-black h-full">
          <ScrollView contentContainerStyle={{ height: "100%" }}>
            <Text className="text-3xl font-semibold text-white mt-10 font-psemibold w-full text-center">Announcements:</Text>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  )
}

export default announcements