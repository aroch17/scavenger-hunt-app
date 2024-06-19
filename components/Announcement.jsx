import { TouchableOpacity, Text, Image, View } from 'react-native'
import React from 'react'
import { icons } from "../constants";
import { Ionicons } from '@expo/vector-icons';

const Announcement = ({ title, description, containerStyles, textStyles }) => {

  return (
    <View>
      <View className={`rounded-xl w-full justify-between items-center min-h-[40px] px-10 py-3 ${containerStyles}`}>
      <Text className={`text-[18em] text-white font-psemibold ${textStyles}`}>{title}</Text>
      {description && (
        <Text className={`text-white font-pregular textStyles`}>{description}</Text>
      )}

      </View>
    </View>
  )
}

export default Announcement