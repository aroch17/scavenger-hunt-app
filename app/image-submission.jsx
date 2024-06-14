import { View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { uploadSubmissionAndStoreInDB } from "../lib/supabase";

const ImageSubmission = () => {
	return (
		<SafeAreaView className="bg-black h-full">
			<View className="bg-black h-full items-center">
				<CustomButton
					title="Upload Image"
					containerStyles="mt-7 border-2 border-white w-full"
					handlePress={async () => {
						try {
							await ImagePicker.requestCameraPermissionsAsync();
							let result = await ImagePicker.launchCameraAsync({
								cameraType: ImagePicker.CameraType.back,
								allowsEditing: true,
                base64: true
							});

							if (!result.canceled) {
                const imageData = result.assets[0].base64
                uploadSubmissionAndStoreInDB(41, 36, imageData)
							}
						} catch (error) {
              console.log("Error uploading image. Please try again.")
            }
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default ImageSubmission;
