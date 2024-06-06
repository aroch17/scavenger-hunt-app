import { View, Text } from 'react-native'
import React from 'react'

const Submission = ({ submission, task_id, created_at, team_id, containerStyles, textStyles}) => {
  return (
    <View>
      <View className={containerStyles}>
        <Text className={textStyles}>Answer: {submission}</Text>
        <Text className={textStyles}>TaskID: {task_id}</Text>
        <Text className={textStyles}>Created At: {created_at}</Text>
        <Text className={textStyles}>Team: {team_id}</Text>

      </View>
      

    </View>
  )
}

export default Submission