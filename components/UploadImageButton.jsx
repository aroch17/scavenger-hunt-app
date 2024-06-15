import { View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "./CustomButton";
import { uploadSubmissionAndStoreInDB } from "../lib/supabase";
import * as ImageManipulator from "expo-image-manipulator";

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
						});

						if (!result.canceled) {
							const imageData = result.assets[0].uri;
							const compressedImageData =
								await ImageManipulator.manipulateAsync(
									imageData,
									[{ resize: { width: 600, height: 600 } }],
									{
										compress: 0.75,
										format: ImageManipulator.SaveFormat.JPEG,
										base64: true,
									}
								);
							uploadSubmissionAndStoreInDB(
								huntId,
								teamId,
								compressedImageData.base64
							);
						}
					} catch (error) {
						console.log(
							"Error uploading image. Please try again." + error.message
						);
					}
				}}
			/>
		</View>
	);
};

export default UploadImageButton;
