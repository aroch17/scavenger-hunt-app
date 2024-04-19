import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
	return (
		<SafeAreaView>
			<View className="bg-black h-full flex justify-center items-center">
				<Text className="text-white text-3xl">Scavenger Hunt</Text>
				<StatusBar style="auto" />
			</View>
		</SafeAreaView>
	);
}
