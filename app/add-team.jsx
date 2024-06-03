import { View, Text } from 'react-native'
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { useMutation } from "@tanstack/react-query";
import { addTeam } from "../lib/supabase";
import { useLocalSearchParams, router } from "expo-router";

const addATeam = () => {

  const mutation = useMutation({
		mutationFn: addTeam,
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["teams", "hunt"] });
		},
	});

	const { huntId } = useLocalSearchParams();

	const [form, setForm] = useState({
		teamName: "",
	});
  return (
    <SafeAreaView className="bg-black h-full">
			<View className="bg-black h-full items-center">
				<Text className="text-white font-pbold text-2xl mt-20">
					Add Team
				</Text>
				<FormField
					title="Team Name:"
					handleChangeText={(e) => setForm({ ...form, teamName: e })}
				/>
				<CustomButton
					title="Add"
					containerStyles="mt-7 border-2 border-white w-full"
					handlePress={() => {
						mutation.mutate({
							name: form.teamName,
							hunt_id: huntId,
						});
						{
							!mutation.isPending && router.push(`/guest/${huntId}`)
						}
					}}
				/>
			</View>
			<StatusBar style="light" />
		</SafeAreaView>
  )
}

export default addATeam