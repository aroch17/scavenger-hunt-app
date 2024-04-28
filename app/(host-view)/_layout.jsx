import React from "react";
import { Stack } from "expo-router";

const HostLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="host" options={{headerShown: false}}/>
		</Stack>
	);
};

export default HostLayout;
