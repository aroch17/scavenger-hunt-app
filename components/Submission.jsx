import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const Submission = ({
	submission,
	task_id,
	created_at,
	team_id,
	requires_approval,
	containerStyles,
	textStyles,
	handlePress,
}) => {
	return (
		<TouchableOpacity onPress={handlePress}>
			<View
				className={`rounded-xl w-full justify-between items-center min-h-[40px] px-10 ${containerStyles}`}
			>
				<View className="flex flex-row items-center">
					<View className="items-center">
						<Text className={textStyles}>Task ID: {task_id}</Text>
						<Text className={textStyles}>Submission: {submission}</Text>
						<Text className={textStyles}>Team: {team_id}</Text>
					</View>
					{requires_approval && (
						<View className="absolute translate-x-48">
							<Ionicons color={"red"} name="alert-outline" size={25} />
						</View>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Submission;
