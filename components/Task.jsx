import { TouchableOpacity, Text, Image, View } from 'react-native'
import React from 'react'
import { icons } from "../constants";

const Task = ({ title, taskType, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`border-white rounded-xl px-4 min-h-[62px] w-full items-center flex flex-row ${containerStyles} $ {isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >

      {taskType === "Text" && (
        <View className="absolute mx-4">
            <Image
              source={icons.bookmark}
              className="w-6 h-6"
              resizeMode="contain"
            />
        </View>
      )}


      <View className="flex flex-row w-full justify-center">
        <Text className={`text-white font-psemibold text-lg" ${textStyles}`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Task