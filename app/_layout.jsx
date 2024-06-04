import { useEffect } from "react";
import { useFonts } from "expo-font";
import React from "react";
import { SplashScreen, Stack } from "expo-router";
import { GlobalProvider } from "../context/GlobalProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-native-reanimated"

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded, error] = useFonts({
		"Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
		"Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
		"Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
		"Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
		"Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
		"Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
		"Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
		"Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
		"Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
	});

	useEffect(() => {
		if (error) throw error;

		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, error]);

	if (!fontsLoaded) {
		return null;
	}

	if (!fontsLoaded && !error) {
		return null;
	}

	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<GlobalProvider>
				<Stack>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="teams/[huntId]" options={{ headerShown: false }} />
					<Stack.Screen name="choose-hunt" options={{ headerShown: false }} />
					<Stack.Screen name="add-task" options={{ headerShown: false }} />
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
					<Stack.Screen name="(host-view)" options={{ headerShown: false }} />
					<Stack.Screen name="guest/[teamId]" options={{ headerShown: false }} />
					<Stack.Screen name="task" options={{ headerShown: false }} />
					<Stack.Screen name="hunt/[huntId]" options={{ headerShown: false }} />
					<Stack.Screen name="home" options={{ headerShown: false }} />
					<Stack.Screen name="hunt-builder" options={{ headerShown: false }} />
				</Stack>
			</GlobalProvider>
		</QueryClientProvider>
	);
}
