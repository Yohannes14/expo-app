import TypeBadge from "@/components/TypeBadge";
import { Pokemon, PokemonListItem } from "@/types";
import { useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";

interface PokemonCardProps {
  pokemon: PokemonListItem;
  details: Pokemon | null;
  openDetails: () => void;
}

const PokemonCard = ({ pokemon, details, openDetails }: PokemonCardProps) => {
  const router = useRouter();

  const displayName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const imageUri = details?.sprites?.front_default;
  const types = details?.types?.map((t) => t.type.name) || ["normal"];

  return (
    <TouchableOpacity onPress={openDetails} className="w-[48%] mb-4">
      <Card className="bg-white rounded-2xl overflow-hidden shadow-sm">
        {/* Header: Name + ID */}
        <View className="flex-row justify-between items-center p-4">
          <Text className="text-lg font-bold text-gray-900">{displayName}</Text>
          {details && (
            <Text className="text-lg font-bold text-gray-900">
              #{String(details.id).padStart(3, "0")}
            </Text>
          )}
        </View>

        {/* Pokemon Image */}
        <View className="h-32 items-center justify-center p-4">
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
          ) : (
            <Text className="text-gray-500 text-sm">No image</Text>
          )}
        </View>

        {/* Types */}
        <View className="p-4 pt-0">
          <View className="flex-row justify-center items-center gap-2">
            {types.slice(0, 2).map((type, index) => (
              <TypeBadge key={index} type={type} />
            ))}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
export default PokemonCard;
