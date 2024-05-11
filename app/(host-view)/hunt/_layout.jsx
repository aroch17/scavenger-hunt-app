import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from "expo-router";


const HuntLayout = () => {
  return (
    <Stack>
			<Stack.Screen name="[hunt]" options={{headerShown: false}}/>
		</Stack>
  )
}

export default HuntLayout