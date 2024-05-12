import { View, Text } from "react-native";
import React, { useState } from "react";
import FormField from "../../components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addHunt, getHuntByName } from "../../lib/supabase";
import { router, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const HuntBuilder = () => {
  const mutation = useMutation({
		mutationFn: addHunt,
		onSuccess: ({data}) => {
      router.push(`/hunt/${data[0].id}`)
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userHunts"] });
		},
	});

  const [form, setForm] = useState({
		name: ""
	});

  const { user } = useGlobalContext()

	return (
		<SafeAreaView className="bg-black h-full">
			<View className="bg-black h-full items-center">
				<Text className="text-white font-pbold text-2xl mt-20">
					Hunt Builder
				</Text>
        <FormField 
          title="Hunt Name"
          handleChangeText={(e) => setForm({ ...form, name: e })}
        />
        <CustomButton 
          title="Add Hunt"
          containerStyles="mt-7 border-2 border-white w-full"
          handlePress={() => {
            mutation.mutate({
							name: form.name,
              creator_id: user.id
						});
          }}
        />
			</View>
		</SafeAreaView>
	);
};

export default HuntBuilder;
