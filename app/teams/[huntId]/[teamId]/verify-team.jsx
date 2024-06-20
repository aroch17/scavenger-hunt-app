import { View, Text, Alert } from "react-native";
import { React, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../../../components/FormField"
import { useQuery } from "@tanstack/react-query";
import CustomButton from "../../../../components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import { getTeam, verifyPassword } from "../../../../lib/supabase";
import { useHuntContext } from "../_layout";

const chooseTeam = () => {
	const { teamId } = useLocalSearchParams();
  const { huntId } = useHuntContext()

	const { data, isLoading, error } = useQuery({
		queryKey: ["teamPassword"],
		queryFn: () => getTeam(teamId),
	});

	const [isSubmitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		password: "",
	});

	const submit = async () => {
		if (form.answer === "") {
			Alert.alert("Error", "Please fill in all fields");
		}
		else {
		  if (await verifyPassword(form.password, data.data[0].password)) {
        router.push(`/guest/${huntId}/${teamId}`)
      }
      else {
        Alert.alert("Incorrect password")
      }
		}
	};

	return (
		<SafeAreaView className="bg-black h-full">
			<View className="bg-black h-full">
				<FormField
					title="Please Enter Team Password"
					value={form.password}
					isPasswordField={true}
					handleChangeText={(e) => setForm({ ...form, password: e })}
					otherStyles="mt-7"
				></FormField>
				<CustomButton
					title="Submit"
					handlePress={submit}
					containerStyles="mt-7 border-2 border-white"
					isLoading={isSubmitting}
				/>
			</View>
		</SafeAreaView>
	);
};

export default chooseTeam;
