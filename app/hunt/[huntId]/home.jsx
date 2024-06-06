import { View, Text, FlatList } from "react-native";
import { React } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Submission from "../../../components/Submission";
import { useHuntContext } from "./_layout";

const HuntHome = () => {
	const { hunt, isLoading } = useHuntContext()

  return (
		<>
			{!isLoading && (
				<SafeAreaView className="bg-black h-full">
					<Text className="text-3xl font-semibold text-white mt-10 font-psemibold w-full text-center">
						Hunt submissions:
					</Text>
					<View className="w-full px-4 my-6">
						{hunt.submissions.length > 0 ? (
							<FlatList
								className="min-h-[80%] max-h-[95%]"
								data={hunt.submissions}
								renderItem={({ item }) => (
									<Submission
										key={item.id}
										submission={item.submission}
										task_id={item.task_id}
										created_at={item.created_at}
										team_id={item.team_id}
										containerStyles="mt-7 border-2 border-white"
										textStyles="text-white"
									/>
								)}
							/>
						) : (
							<Text className="text-white font-pregular text-xl">
								No submissions to display.
							</Text>
						)}
					</View>
				</SafeAreaView>
			)}
		</>
	);
};

export default HuntHome;
