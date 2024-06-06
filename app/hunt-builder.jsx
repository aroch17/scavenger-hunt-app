import { View, Text } from "react-native";
import React, { useState } from "react";
import FormField from "../components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { useMutation } from "@tanstack/react-query";
import { addHunt } from "../lib/supabase";
import { router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import { generateUniqueID } from "../lib/uniqueId";

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
		name: "",
    description: ""
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
          otherStyles="mb-7"
          handleChangeText={(e) => setForm({ ...form, name: e })}
        />
        {/* TODO: make description field taller and align text to top */}
        <FormField 
          title="Description"
          handleChangeText={(e) => setForm({ ...form, description: e })}
        />
        <CustomButton 
          title="Add Hunt"
          containerStyles="mt-7 border-2 border-white w-full"
          handlePress={() => {
            mutation.mutate({
							name: form.name,
              description: form.description,
              creator_id: user.id,
              hunt_code: generateUniqueID()
						});
          }}
        />
			</View>
		</SafeAreaView>
	);
};

export default HuntBuilder;
