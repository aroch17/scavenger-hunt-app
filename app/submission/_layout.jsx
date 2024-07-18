import React from "react";
import { Stack } from "expo-router";

const SubmissionLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="[submissionId]" options={{headerShown: false}}/>
		</Stack>
	);
};

export default SubmissionLayout;
