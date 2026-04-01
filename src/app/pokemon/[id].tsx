// app/pokemon/[id].tsx
import StatBar from "@/components/Statbar";
import { Pokemon } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import TypeBadge from "../../components/TypeBadge";
import { fetchPokemonDetails } from "../../services/pokeApi";

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) loadPokemon();
  }, [id]);

  const loadPokemon = async () => {
    try {
      setLoading(true);
      const data = await fetchPokemonDetails(id!);
      setPokemon(data);
    } catch (err) {
      setError("Failed to load Pokémon details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50">
        <Text className="text-red-500 text-lg">
          {error || "Pokémon not found"}
        </Text>
      </View>
    );
  }

  const types = pokemon.types.map((t) => t.type.name);
  const heightInMeters = (pokemon.height / 10).toFixed(1);
  const weightInKg = (pokemon.weight / 10).toFixed(1);

  // Mockup-style height/weight (Bulbasaur example: 2'04" and 15.2 lbs)
  const heightFeet = "2'04\"";
  const weightLbs = "15.2 lbs";

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="px-5 pt-2">
        {/* Stats + Image Card (Main Content) */}
        <Card className="mb-8 bg-white">
          <View className="flex-row justify-between items-center mb-6 p-6">
            <View>
              <Text className="text-gray-500 text-sm font-medium">
                #{String(pokemon.id).padStart(3, "0")}
              </Text>
              <Text className="text-4xl font-bold text-gray-900">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </Text>
            </View>

            <View className="flex-row gap-2">
              {types.map((type, index) => (
                <TypeBadge key={index} type={type} />
              ))}
            </View>
          </View>
          <Card.Content className="flex-row items-center p-6">
            {/* Stats - Left Side */}
            <View className="flex-1 pr-6">
              {pokemon.stats.slice(0, 4).map(
                (
                  stat,
                  index, // HP, Attack, Defense, Speed
                ) => (
                  <StatBar
                    key={index}
                    label={stat.stat.name}
                    value={stat.base_stat}
                  />
                ),
              )}
            </View>

            {/* Image - Right Side */}
            <View className="items-centejustify-center">
              <Image
                source={{ uri: pokemon.sprites.front_default || "" }}
                className="w-40 h-40"
                resizeMode="contain"
              />
            </View>
          </Card.Content>
        </Card>

        {/* Breeding Section */}
        <Card className="mb-8">
          <Card.Title title="Breeding" />
          <Card.Content>
            <View className="flex-row justify-between gap-6">
              {/* Height */}
              <View className="flex-1 items-center">
                <Text className="text-gray-500 font-bold text-sm mb-1">
                  Height
                </Text>
                <View className="bg-slate-100 flex-row justify-between items-center rounded-xl px-6 py-3 w-full border border-slate-300">
                  <Text className="text-lg font-semibold text-gray-900">
                    {heightFeet}
                  </Text>
                  <Text className="text-xs font-semibold text-gray-500 mt-0.5">
                    {heightInMeters} m
                  </Text>
                </View>
              </View>

              {/* Weight */}
              <View className="flex-1 items-center">
                <Text className="text-gray-500 font-bold text-sm mb-1">
                  Weight
                </Text>
                <View className="bg-slate-100 flex-row justify-between items-center rounded-xl px-6 py-3 w-full border border-slate-300">
                  <Text className="text-lg font-semibold text-gray-900">
                    {weightLbs}
                  </Text>
                  <Text className="text-xs font-semibold text-gray-500 mt-0.5">
                    {weightInKg} kg
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Moves Section */}
        <Card>
          <Card.Title title="Moves" />
          <Card.Content>
            <View className="flex-row items-center">
              <Text className="text-gray-600 text-base leading-relaxed flex-1">
                {pokemon.moves
                  .slice(0, 10)
                  .map((m) => m.move.name)
                  .join(", ")}
                {pokemon.moves.length > 10 && "..."}
              </Text>

              <Button
                mode="contained"
                buttonColor="#1E1E23"
                onPress={() => alert("Full moves list would open here!")}
              >
                See all
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}
