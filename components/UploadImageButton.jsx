import { View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "./CustomButton";
import { uploadSubmissionAndStoreInDB } from "../lib/supabase";

const UploadImageButton = ({ huntId, teamId }) => {
	return (
		<View>
			<CustomButton
				title="Upload Image"
				containerStyles="mt-7 border-2 border-white w-full"
				handlePress={async () => {
					try {
						await ImagePicker.requestCameraPermissionsAsync();
						let result = await ImagePicker.launchCameraAsync({
							cameraType: ImagePicker.CameraType.back,
							allowsEditing: true,
							base64: true,
						});

						if (!result.canceled) {
							const imageData = result.assets[0].base64;
							uploadSubmissionAndStoreInDB(huntId, teamId, imageData);
						}
					} catch (error) {
						console.log("Error uploading image. Please try again.");
					}
				}}
			/>
		</View>
	);
};

export default UploadImageButton;
