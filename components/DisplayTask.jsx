import { Text, View, Alert } from "react-native";
import { React, useState } from "react";
import FormField from "./FormField";
import CustomButton from "./CustomButton";
import { useMutation } from "@tanstack/react-query";
import { addSubmission } from "../lib/supabase";
import UploadImage from "./UploadImageButton";

const DisplayTask = ({
	taskId,
	teamId,
	title,
	prompt,
	answer,
	taskType,
	huntId,
	otherStyles,
	textStyles,
	value,
	placeholder,
	handleChangeText,
}) => {
	const [isSubmitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		answer: "",
	});

	const mutation = useMutation({
		mutationFn: addSubmission,
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["submissions"] });
		},
	});

	const submit = async () => {
		if (form.answer === "") {
			Alert.alert("Error", "Please fill in all fields");
		} else if (form.answer === answer) {
			Alert.alert("Answer was correct: " + form.answer);
			mutation.mutate({
				submission: form.answer,
				task_id: taskId,
				team_id: teamId,
				hunt_id: huntId,
			});
		} else {
			Alert.alert("Incorrect");
		}
	};

	return (
		<View className="w-full justify-center min-h-[85vh] px-4 my-6">
			<Text className={textStyles}>{title}</Text>
			<Text className={textStyles}>{prompt}</Text>
			<Text className={textStyles}>Type: {taskType}</Text>

			{taskType == "Text" ? (
				<>
					<FormField
						title="Put answer here: "
						value={form.answer}
						handleChangeText={(e) => setForm({ ...form, answer: e })}
						otherStyles="mt-7"
					/>

					<CustomButton
						title="Submit"
						handlePress={submit}
						containerStyles="mt-7 border-2 border-white"
						isLoading={isSubmitting}
					/>
				</>
			) : taskType == "Image" ? (
				<>
					<UploadImage huntId={huntId} teamId={teamId}/>
				</>
			) : (
        <></>
      )}
		</View>
	);
};

export default DisplayTask;
