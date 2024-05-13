import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { useMutation } from "@tanstack/react-query";
import { addTask } from "../lib/supabase";
import { useLocalSearchParams, router } from "expo-router";

const Host = () => {
	const mutation = useMutation({
		mutationFn: addTask,
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["tasks", "hunt"] });
		},
	});

	const { huntId } = useLocalSearchParams();

	const [form, setForm] = useState({
		title: "",
		prompt: "",
		answer: "",
		taskType: "",
	});

	return (
		<SafeAreaView className="bg-black h-full">
			<View className="bg-black h-full items-center">
				<Text className="text-white font-pbold text-2xl mt-20">
					Add Question
				</Text>
				<FormField
					title="Title"
					handleChangeText={(e) => setForm({ ...form, title: e })}
				/>
				<FormField
					title="Prompt"
					handleChangeText={(e) => setForm({ ...form, prompt: e })}
				/>
				<FormField
					title="Answer"
					handleChangeText={(e) => setForm({ ...form, answer: e })}
				/>
				<FormField
					title="Type"
					handleChangeText={(e) => setForm({ ...form, taskType: e })}
				/>
				<CustomButton
					title="Add"
					containerStyles="mt-7 border-2 border-white w-full"
					handlePress={() => {
						mutation.mutate({
							title: form.title,
							prompt: form.prompt,
							answer: form.answer,
							task_type: form.taskType,
							hunt_id: huntId,
						});
						{
							!mutation.isPending && router.replace(`/hunt/${huntId}`)
						}
					}}
				/>
			</View>
			<StatusBar style="light" />
		</SafeAreaView>
	);
};

export default Host;
