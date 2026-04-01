import { getTypeColor } from "@/constants/typeColors";
import React from "react";
import { Text, View } from "react-native";
type Props = {
  type: string;
};

const TypeBadge = ({ type }: Props) => {
  const backgroundColor = getTypeColor(type);

  return (
    <View className="px-4 py-1 rounded-full" style={{ backgroundColor }}>
      <Text className="text-white text-xs font-semibold tracking-wide capitalize">
        {type}
      </Text>
    </View>
  );
};

export default TypeBadge;
