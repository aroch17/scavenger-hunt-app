import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import Task from "../../../components/Task";
import CustomButton from "../../../components/CustomButton";
import { useHuntContext } from "./_layout";


const HuntAnnouncements = () => {
  const { huntId, hunt, isLoading } = useHuntContext()

  return (
    <>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<View className="bg-black items-center">
						<Text className="mt-5 font-bold text-white text-2xl mt-20">Latest Updates: </Text>
						{hunt.announcements.length > 0 ? (
							<FlatList
								className="max-h-[60%]"
								data={hunt.announcements}
								renderItem={({ item }) => (
									<Task
										key={item.id}
										title={item.title}
										containerStyles="mt-7 border-2 border-white"
									/>
								)}
							/>
						) : (
							<Text className="text-white font-pregular text-xl">
								No tasks to display.
							</Text>
						)}
						<CustomButton
							title="Add Announcement"
							containerStyles="mt-7 bg-white w-full"
							textStyles="text-black"
							handlePress={() => {
								router.replace({pathname:"/add-announcement", params:{huntId: huntId}});
							}}
						/>
					</View>
				</SafeAreaView>
			)}
		</>
  )
}

export default HuntAnnouncements