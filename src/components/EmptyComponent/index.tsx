import { Text, View } from "react-native";

interface EmptyComponentProps {
  message?: string;
}

const EmptyComponent = ({ message = "" }: EmptyComponentProps) => {
  return (
    <View className="flex-1 justify-center items-center py-20">
      <Text className="text-gray-500 text-lg text-center">
        No Pokémon found for "{message}"
      </Text>
    </View>
  );
};
export default EmptyComponent;
