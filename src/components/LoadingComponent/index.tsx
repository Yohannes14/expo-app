import { COLORS } from "@/constants/typeColors";
import { ActivityIndicator, Text, View } from "react-native";

interface LoadingScreenProps {
  message?: string;
}

const LoadingComponent = ({
  message = "Loading Pokédex...",
}: LoadingScreenProps) => {
  return (
    <View className="flex-1 justify-center items-center bg-slate-50">
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text className="mt-4 text-gray-600 text-center">{message}</Text>
    </View>
  );
};
export default LoadingComponent;
