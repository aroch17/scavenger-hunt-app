import React from "react";
import { Stack } from "expo-router";

const TaskLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="[id]" options={{headerShown: false}}/>
		</Stack>
	);
};

export default TaskLayout;
