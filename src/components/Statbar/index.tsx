import React from "react";
import { Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";
type Props = {
  label: string;
  value: number;
};

const getStatColor = (statName: string): string => {
  if (statName.toLowerCase().includes("hp")) return "#22c55e";
  if (statName.toLowerCase().includes("attack")) return "#ef4444";
  if (statName.toLowerCase().includes("defense")) return "#eab308";
  if (statName.toLowerCase().includes("speed")) return "#3b82f6";
  return "#64748b";
};

const StatBar = ({ label, value }: Props) => {
  const statColor = getStatColor(label);
  return (
    <View className="mb-5">
      <View className="flex-row justify-between mb-1.5">
        <Text className="text-gray-700 font-medium capitalize">
          {label.replace("-", " ")}
        </Text>
        <Text className="font-bold text-gray-900">{value}</Text>
      </View>
      <ProgressBar
        progress={Math.min(value / 255, 1)}
        color={statColor}
        style={{ height: 8, borderRadius: 9999 }}
      />
    </View>
  );
};

export default StatBar;
