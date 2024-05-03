import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useMutation } from "@tanstack/react-query";
import { addQuestion } from "../../lib/supabase";
import uuid from 'react-native-uuid';

const Host = () => {
	function getCurrentDateTime() {
		const now = new Date();

		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, "0");
		const day = String(now.getDate()).padStart(2, "0");
		const hours = String(now.getHours()).padStart(2, "0");
		const minutes = String(now.getMinutes()).padStart(2, "0");
		const seconds = String(now.getSeconds()).padStart(2, "0");
		const timezoneOffset = -now.getTimezoneOffset() / 60;

		const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${
			timezoneOffset < 0 ? "-" : "+"
		}${Math.abs(timezoneOffset).toString().padStart(2, "0")}`;

		return formattedDateTime;
	}

	const mutation = useMutation({
		mutationFn: addQuestion,
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["questions"] });
		},
	});

	const [form, setForm] = useState({
		question: "",
		answer: "",
	});
	// console.log(form);
	return (
		<SafeAreaView className="bg-black h-full">
			<View className="bg-black h-full items-center">
				<Text className="text-white font-pbold text-2xl mt-20">
					Add Question
				</Text>
				<FormField
					title="Question"
					handleChangeText={(e) => setForm({ ...form, question: e })}
				/>
				<FormField
					title="Answer"
					handleChangeText={(e) => setForm({ ...form, answer: e })}
				/>
				<CustomButton
					title="Add"
					containerStyles="mt-7 border-2 border-white w-full"
					handlePress={() => {
						const date = new Date();
						let day = date.getDate();
						let month = date.getMonth() + 1;
						let year = date.getFullYear();
						let time;
						mutation.mutate({
							id: uuid.v4(),
							data: {
								question: form.question,
								answer: form.answer,
							},
							inserted_at: getCurrentDateTime(),
							updated_at: getCurrentDateTime(),
						});
					}}
				/>
			</View>
			<StatusBar style="light" />
		</SafeAreaView>
	);
};

export default Host;
