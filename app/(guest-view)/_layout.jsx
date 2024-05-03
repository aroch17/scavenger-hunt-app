import React from "react";
import { Stack } from "expo-router";

const GuestLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="guest" options={{ headerShown: false }} />
		</Stack>
	);
};

export default GuestLayout;
