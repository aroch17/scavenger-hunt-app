import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../components/FormField'
import { useGlobalContext } from '../context/GlobalProvider'
import { getTeams } from "../lib/supabase";
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import CustomButton from '../components/CustomButton'
import { router } from 'expo-router'

const chooseTeam = () => {

  const { huntId } = useLocalSearchParams();

  const {
		data: queryData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["userTeams"],
		queryFn: () => getTeams(huntId),
	});

  return (
    <>
			{!isLoading && (
        <SafeAreaView className="bg-black h-full">
              <View className="bg-black items-center">
                <Text className="text-white font-pbold text-2xl mt-20">
                  HUNT NAME: Can you do two queries?
                </Text>
                <Text className="mt-5 font-bold text-white text-xl">Teams: </Text>
                {queryData.data.length > 0 ? (
                  <FlatList
                    className="max-h-[60%]"
                    data={queryData.data}
                    renderItem={({ item }) => (
                      <CustomButton
                        containerStyles="mt-7 border-2 border-white"
                        title={item.name}
                        handlePress={() => {
                          router.push(`/guest/${huntId}`);
                        }}
                        >
                      </CustomButton>
                    )}
                  />
                ) : (
                  <Text className="text-white font-pregular text-xl">
                    No teams to display.
                  </Text>
                )}
                <CustomButton
                  title="Add Team"
                  containerStyles="mt-7 bg-white w-full"
                  textStyles="text-black"
                  handlePress={() => {
                    router.replace({pathname:"/add-team", params:{huntId: huntId}});
                  }}
                />
              </View>
            </SafeAreaView>
      )}
    </>
  )
}

export default chooseTeam