import { Text, TouchableOpacity, View } from "react-native";

interface ErrorComponentProps {
  message?: string;
  onRetry?: () => void;
}
const ErrorComponent = ({
  message = "Failed to load Pokémon. Please try again.",
  onRetry,
}: ErrorComponentProps) => {
  return (
    <View className="flex-1 justify-center items-center bg-slate-50 p-6">
      <Text className="text-red-500 text-center text-lg">{message}</Text>

      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="mt-6 bg-blue-600 px-8 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default ErrorComponent;
