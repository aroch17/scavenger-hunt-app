import { View, Text } from 'react-native'
import React, { createContext, useContext } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { useQuery} from '@tanstack/react-query';
import { getHunt } from '../../../lib/supabase';

const Context = createContext();
export const useHuntContext = () => useContext(Context);

const ChooseTeamLayout = () => {
  const { huntId } = useLocalSearchParams();

  let hunt = null;

	const { data, isLoading, error } = useQuery({
		queryKey: ["hunt"],
		queryFn: () => getHunt(huntId),
	});

	if (!isLoading) {
		hunt = data.data[0];
	}

  return (
    <>
			{!isLoading && (
				<Context.Provider value={{ huntId, hunt, isLoading }}>
					<Stack>
						<Stack.Screen name="add-team" options={{ headerShown: false }} />
						<Stack.Screen name="choose-team" options={{ headerShown: false }} />
					</Stack>
        </Context.Provider>
			)}
		</>
  )
}

export default ChooseTeamLayout