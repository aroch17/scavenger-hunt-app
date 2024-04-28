import { Stack } from "expo-router";
import React from "react";

const GuestLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="guest" options={{ headerShown: false }} />
		</Stack>
	);
};

export default GuestLayout;
