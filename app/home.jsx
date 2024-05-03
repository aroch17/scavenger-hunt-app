import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { router, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalProvider";

const Home = () => {
  const { isLoading } = useGlobalContext()
	return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<ScrollView contentContainerStyle={{ height: "100%" }}>
						<View className="bg-black h-full flex justify-center items-center">
							<Text className="text-white text-3xl font-pbold mb-4">
								Scavenger Hunt
							</Text>
							<View className="flex flex-row gap-3">
								<TouchableOpacity
									onPress={() => {
										router.push("/sign-in");
									}}
									activeOpacity={0.7}
									className="bg-white p-[10px]"
								>
									<Text className="font-pregular">I am a host</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										router.push("/guest");
									}}
									activeOpacity={0.7}
									className="bg-white p-[10px]"
								>
									<Text className="font-pregular">I am a guest</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
					<StatusBar style="dark" />
				</SafeAreaView>
			)}
		</>
	);
};

export default Home;
