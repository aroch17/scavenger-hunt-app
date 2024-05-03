import { TouchableOpacity, Text, Image } from 'react-native'
import React from 'react'
import { icons } from "../constants";

const Task = ({title, taskType, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.7}
    className={`border-white rounded-xl px-4 min-h-[62px] w-full justify-center items-center flex flex-row ${containerStyles} $ {isLoading ? 'opacity-50' : ''}`}
    disabled={isLoading}
    >

    
      {taskType === "Text" && (
          <TouchableOpacity>
            <Image
              source={icons.bookmark}
              className="w-6 h-6 mx-[50]"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

      

      <Text className={`text-white font-psemibold text-lg" ${textStyles}`}>
        {title}
      </Text>

      

    </TouchableOpacity>
  )
}

export default Task