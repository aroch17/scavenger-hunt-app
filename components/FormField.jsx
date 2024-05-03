import { View, Text, TextInput } from 'react-native'
import {React, useState} from 'react'

const FormField = ({
  title, 
  value, 
  placeholder, 
  handleChangeText, 
  otherStyles, 
  ...props 
}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text classname= "text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-3 border-red-500 w-full h-16 px-4 bg-black-100 rounded-2xl">
        <TextInput className = "flex-1 text-white font-psemibold text-base"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7B7B8B"
        onChangeText= {handleChangeText}
        />
      </View>
    </View>
  )
}

export default FormField