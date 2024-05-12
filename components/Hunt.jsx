import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

export default Hunt = ({ name, handlePress, isLoading, textStyles, containerStyles}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`border-white rounded-xl px-4 min-h-[62px] w-full items-center flex flex-row ${containerStyles} $ {isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <View className="flex flex-row w-full justify-center">
        <Text className={`text-white font-psemibold text-lg" ${textStyles}`}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}