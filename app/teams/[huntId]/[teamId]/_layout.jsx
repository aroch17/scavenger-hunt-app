import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../../../context/GlobalProvider";

const VerifyTeamLayout = () => {
	const { isLoading } = useGlobalContext();
	const { teamId } = useLocalSearchParams();

	return (
		<>
			{!isLoading && (
				<Stack>
					<Stack.Screen name="verify-team" options={{ headerShown: false }} initialParams={{teamId: teamId}}/>
				</Stack>
			)}
		</>
	);
};

export default VerifyTeamLayout;
