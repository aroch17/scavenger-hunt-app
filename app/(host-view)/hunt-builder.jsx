import { View, Text } from "react-native";
import React from "react";
import FormField from "../../components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";


const HuntBuilder = () => {
	return (
		<SafeAreaView className="bg-black h-full">
			<View className="bg-black h-full items-center">
				<Text className="text-white font-pbold text-2xl mt-20">
					Hunt Builder
				</Text>
        <FormField 
          title="Hunt Name"
        />
        <CustomButton 
          title="Add Hunt"
          containerStyles="mt-7 border-2 border-white w-full"
          handlePress={() => {}}
        />
			</View>
		</SafeAreaView>
	);
};

export default HuntBuilder;
