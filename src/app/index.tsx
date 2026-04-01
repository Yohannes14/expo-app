import TypeBadge from "@/components/TypeBadge";
import { fetchPokemonDetails, fetchPokemonList } from "@/services/pokeApi";
import { Pokemon } from "@/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar, Card, Searchbar, Text } from "react-native-paper";

export default function HomeScreen() {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const loadPokemon = async () => {
    try {
      setLoading(true);
      const list = await fetchPokemonList(151);
      const detailedList = await Promise.all(
        list.map(async (pokemon: any) => {
          const details = await fetchPokemonDetails(pokemon.name);
          return { ...pokemon, details };
        }),
      );
      console.log("Detailed Pokémon List:", detailedList);
      setPokemonList(detailedList);
      setFilteredList(detailedList);
    } catch (error) {
      console.error("Error loading Pokémon:", error);
      setError("Failed to load Pokémon details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredList(pokemonList);
      return;
    }
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredList(filtered);
  };
  const openPokemonDetails = (pokemon: Pokemon) => {
    router.push(`/pokemon/${pokemon.name}`);
  };
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="mt-4 text-gray-600">Loading Pokédex...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50 p-6">
        <Text className="text-red-500 text-center text-lg">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header with Search */}
      <Appbar.Header
        style={{
          backgroundColor: "#2563eb",
          paddingBottom: 24,
          // paddingTop: 16,
        }}
      >
        <View className="flex-1 justify-center items-center px-4">
          <Text
            className="text-lg font-semibold text-center mb-4"
            style={{ color: "#ffffff" }}
          >
            Who are you looking for?
          </Text>
          <View className="w-full relative justify-center">
            <Searchbar
              placeholder="Search Pokémon (e.g. Pikachu)"
              onChangeText={handleSearch}
              value={searchQuery}
              className="bg-white rounded-xl"
              style={{ backgroundColor: "#ffffff", paddingRight: 80 }}
              inputStyle={{ color: "#1f2937" }}
              icon="magnify"
              iconColor="#64748b"
              onIconPress={() => handleSearch(searchQuery)}
              right={() => (
                <TouchableOpacity
                  onPress={() => handleSearch(searchQuery)}
                  className="bg-black rounded-md px-3 h-8 justify-center items-end ml-2"
                >
                  <Text className="text-white font-bold text-xs">Go</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Appbar.Header>

      {/* Pokemon List */}
      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
        renderItem={({ item }) => {
          const p = item.details || item;
          const types = p.types.map((t: any) => t.type.name) || ["Unknown"];
          return (
            <TouchableOpacity
              onPress={() => openPokemonDetails(p)}
              className="w-[48%] mb-4"
            >
              <Card className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <View className="flex-row justify-between items-center p-4">
                  <Text className="text-lg font-bold text-gray-900">
                    {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                  </Text>
                  <Text className="text-lg font-bold text-gray-900">
                    #{String(p.id).padStart(3, "0")}{" "}
                  </Text>
                </View>
                <View className="h-40 items-center justify-center p-4">
                  <Image
                    source={{ uri: p.sprites.front_default }}
                    style={{ width: 100, height: 100 }}
                    resizeMode="contain"
                  />
                </View>

                <View className="p-4">
                  <View className="flex-row justify-between items-center gap-2 mt-3">
                    {types.map((type: string, index: number) => (
                      <TypeBadge key={index} type={type} />
                    ))}
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
