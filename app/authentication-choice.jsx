import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalProvider";
import CustomButton from "../components/CustomButton";
import { signInAnonymously, getCurrentUserDetails } from "../lib/supabase";

const AuthenticatedChoice = () => {
	const { isLoading, isLoggedIn, setIsLoggedIn, setUsername, setUser } = useGlobalContext();
	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<ScrollView contentContainerStyle={{ height: "100%" }}>
						<View className="bg-black h-full flex justify-center items-center">
							<Text className="text-white text-3xl font-pbold">
								Select an option:
							</Text>
							<CustomButton
								title="Sign In"
								containerStyles="mt-7 bg-white w-[80%] "
								textStyles="text-black text-xl"
								handlePress={() => {
									router.push("/sign-in");
								}}
							/>
							<CustomButton
								title="Continue as Guest"
								containerStyles="mt-7 bg-white w-[80%]"
								textStyles="text-black text-xl"
								handlePress={async () => {
									const { data, error } = await signInAnonymously();
									if (data) {
										setUser(data.session.user);
										setIsLoggedIn(true);
										const { data: userDetailsData, error } =
											await getCurrentUserDetails(data.session.user);
                    if (userDetailsData) {
                      setUsername(userDetailsData.username)
                    }
									}
                  router.replace("/choose-hunt");
								}}
							/>
						</View>
					</ScrollView>
					<StatusBar style="light" />
				</SafeAreaView>
			)}
		</>
	);
};

export default AuthenticatedChoice;
