import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../components/FormField'

const chooseHunt = () => {
  return (
    <SafeAreaView className="bg-black h-full">
      <View className="bg-black h-full items-center">

          <FormField title = "Please Enter A Hunt Code"></FormField>
          
      </View>
    </SafeAreaView>
    
  )
}

export default chooseHunt