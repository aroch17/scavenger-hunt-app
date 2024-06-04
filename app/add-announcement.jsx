import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { useMutation } from "@tanstack/react-query";
import { addAnnouncement } from "../lib/supabase";
import { useLocalSearchParams, router } from "expo-router";

const AddAnnoucement = () => {
	const mutation = useMutation({
		mutationFn: addAnnouncement,
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["hunt"] });
		},
	});

	const { huntId } = useLocalSearchParams();

	const [form, setForm] = useState({
		title: "",
		description: ""
	});

	return (
		<SafeAreaView className="bg-black h-full">
			<View className="bg-black h-full items-center">
				<Text className="text-white font-pbold text-2xl mt-20">
					Add Announcement
				</Text>
				<FormField
					title="Title"
					handleChangeText={(e) => setForm({ ...form, title: e })}
				/>
				<FormField
					title="Description"
					handleChangeText={(e) => setForm({ ...form, description: e })}
				/>
				<CustomButton
					title="Add"
					containerStyles="mt-7 border-2 border-white w-full"
					handlePress={() => {
						mutation.mutate({
							title: form.title,
							description: form.description,
							hunt_id: huntId,
						});
						{
							!mutation.isPending && router.replace(`/hunt/${huntId}/announce`)
						}
					}}
				/>
			</View>
			<StatusBar style="light" />
		</SafeAreaView>
	);
};

export default AddAnnoucement;
