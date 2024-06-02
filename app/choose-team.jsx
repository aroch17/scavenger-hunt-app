import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../components/FormField'
import { useGlobalContext } from '../context/GlobalProvider'
import { getTeams } from "../../lib/supabase";

const chooseTeam = () => {

  const { hunt } = useGlobalContext();

  const {
		data: queryData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["userTeams"],
		queryFn: () => getTeams(hunt.id),
	});

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="bg-black h-full items-center">
          <Text className="text-white">Please Select A Team</Text>
          <FormField title="Don't see your team? Create a team here"></FormField>
      </View>
    </SafeAreaView>
  )
}

export default chooseTeam