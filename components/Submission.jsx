import { View, Text } from 'react-native'
import React from 'react'

const Submission = ({ submission, task_id, created_at, team_id, containerStyles, textStyles}) => {
  return (
    <View>
      <View className={`rounded-xl w-full justify-between items-center min-h-[40px] px-10 ${containerStyles}`}>
      <Text className={textStyles}>Task ID: {task_id}</Text>
        <Text className={textStyles}>Submission: {submission}</Text>
        <Text className={textStyles}>Team: {team_id}</Text>

      </View>
      

    </View>
  )
}

export default Submission