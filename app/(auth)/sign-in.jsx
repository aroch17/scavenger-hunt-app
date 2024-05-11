import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCurrentUserDetails, signInUser } from "../../lib/supabase";
import { router } from "expo-router";
import { supabase } from "../../lib/supabase";
import { useGlobalContext } from "../../context/GlobalProvider";
import { StatusBar } from "expo-status-bar";

const SignIn = () => {
	const { setUsername } = useGlobalContext();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signUp = async (email, password) => {
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});
		if (error) {
			console.log(error);
		} else {
			signIn(email, password);
			console.log(data);
		}
	};

	const signIn = async (email, password) => {
		const { data: signInData, error } = await signInUser(email, password);
		if (error) {
			alert(error, [{text: "Ok"}])
		}
		if (signInData) {
			const { data: userDetailsData, error } = await getCurrentUserDetails(signInData.session.user);
			if (error) {
				console.log(error.message)
			}
			if (userDetailsData) {
				const { username } = userDetailsData;
				setUsername(username);
			}
		}
		router.dismiss()
		router.replace("/hunts");
	};

	return (
		<SafeAreaView className="bg-black h-full">
			<View className="bg-black h-full flex justify-center items-center gap-8">
				<View className={`space-y-2`}>
					<Text className="text-base text-gray-100 font-pmedium">Email</Text>
					<View className="w-full h-16 flex flex-row items-center justify-center border-2 border-white px-4">
						<TextInput
							className="flex-1 text-white font-psemibold text-base"
							value={email}
							placeholder="email"
							placeholderTextColor="#7B7B8B"
							onChangeText={(text) => setEmail(text)}
						/>
					</View>
				</View>
				<View className={`space-y-2`}>
					<Text className="text-base text-gray-100 font-pmedium">Password</Text>
					<View className="w-full h-16 flex flex-row items-center justify-center border-2 border-white px-4">
						<TextInput
							className="flex-1 text-white font-psemibold text-base"
							value={password}
							placeholder="password"
							placeholderTextColor="#7B7B8B"
							onChangeText={(text) => setPassword(text)}
							secureTextEntry={true}
						/>
					</View>
				</View>
				<TouchableOpacity
					onPress={() => {
						signIn(email, password);
					}}
					activeOpacity={0.7}
					className="bg-white p-[10px] w-full flex flex-row justify-center"
				>
					<Text className="font-pregular">Sign In</Text>
				</TouchableOpacity>
			</View>
			<StatusBar style="light" />
		</SafeAreaView>
	);
};

export default SignIn;
