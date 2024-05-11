import React from "react";
import { Stack } from "expo-router";

const HostLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="hunt-builder" options={{headerShown: false}}/>
			<Stack.Screen name="[hunt]" options={{headerShown: false}}/>
			<Stack.Screen name="host" options={{headerShown: false}}/>
		</Stack>
	);
};

export default HostLayout;
