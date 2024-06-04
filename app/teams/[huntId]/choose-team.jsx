import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../../components/FormField'
import { useGlobalContext } from '../../../context/GlobalProvider'
import { getTeams } from "../../../lib/supabase";
import {getHunt} from "../../../lib/supabase";
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import CustomButton from '../../../components/CustomButton'
import { router } from 'expo-router'
import { useHuntContext } from './_layout'

const chooseTeam = () => {

  const { huntId, hunt, isLoading } = useHuntContext()

  console.log(hunt)

  return (
    <>
			{!isLoading && (
        <SafeAreaView className="bg-black h-full">
              <View className="bg-black items-center">
                <Text className="text-white font-pbold text-2xl mt-20">
                  {hunt.name}
                </Text>
                <Text className="mt-5 font-bold text-white text-xl">Teams: </Text>
                {hunt.teams.length > 0 ? (
                  <FlatList
                    className="max-h-[60%]"
                    data={hunt.teams}
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
                    router.replace("./add-team");
                  }}
                />
              </View>
            </SafeAreaView>
      )}
    </>
  )
}

export default chooseTeam