import { View, Text } from "react-native";
import React from "react";

const Team = ({
	title,
	position,
  points,
	handlePress,
	containerStyles,
	textStyles,
	isLoading

}) => {

	console.log(typeof position)

	switch (position) {
		case 1:
			positionTextStyle = "text-yellow-500";
			break;
		case 2:
			positionTextStyle = 'text-stone-500';
			break;
		case 3:
				positionTextStyle = 'text-amber-600';
				break;
		default:
			positionTextStyle =  "text-white";
	}

	return (
		<View className={`flex flex-row w-full justify-between items-center min-h-[40px] px-10 ${containerStyles}`}>
			<View className="flex flex-row">
				<Text className={`font-psemibold text-xl ${positionTextStyle}`}>
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
