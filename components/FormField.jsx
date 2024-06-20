import { View, Text, TextInput } from "react-native";
import { React, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const FormField = ({
	title,
	value,
	isPasswordField,
	placeholder,
	handleChangeText,
	otherStyles,
}) => {
	const [textHidden, setTextHidden] = useState(isPasswordField);
	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className="text-base text-white font-pmedium">{title}</Text>
			<View className="w-full h-16 px-5 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
				{isPasswordField ? (
					<>
						<TextInput
							className="flex-1 text-white font-psemibold text-base"
							value={value}
							placeholder={placeholder}
							placeholderTextColor="#7B7B8B"
							onChangeText={handleChangeText}
							secureTextEntry={textHidden}
						/>
            {textHidden ? (
              <Ionicons
							color={"white"}
							name="eye-outline"
							size={25}
							onPress={() => {
								setTextHidden(!textHidden)
							}}
						/>
            ) : (
              <Ionicons
							color={"white"}
							name="eye-off-outline"
							size={25}
							onPress={() => {
								setTextHidden(!textHidden)
							}}
						/>
            )}
						
					</>
				) : (
					<>
						<TextInput
							className="flex-1 text-white font-psemibold text-base"
							value={value}
							placeholder={placeholder}
							placeholderTextColor="#7B7B8B"
							onChangeText={handleChangeText}
						/>
					</>
				)}
			</View>
		</View>
	);
};

export default FormField;
