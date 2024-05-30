import { View, Text } from "react-native";
import React from "react";

const Team = ({
	title,
	position,
  points,
	handlePress,
	containerStyles,
	textStyles,
	isLoading,
}) => {
	return (
		<View className={`flex flex-row w-full justify-between items-center min-h-[40px] px-10 ${containerStyles}`}>
			<View className="flex flex-row">
				<Text className={`font-psemibold text-xl ${textStyles}`}>
					{position}.{" "}
				</Text>
				<Text className={`font-psemibold text-white text-xl`}>
					{title}
				</Text>
			</View>
      <View>
        <Text className={`font-psemibold text-white text-xl`}>{points}</Text>
      </View>
		</View>
	);
};

export default Team;
