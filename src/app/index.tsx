import TypeBadge from "@/components/TypeBadge";
import { COLORS } from "@/constants/typeColors";
import { fetchPokemonDetails, fetchPokemonList } from "@/services/pokeApi";
import { Pokemon, PokemonListItem } from "@/types";
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

interface PokemonWithDetails extends PokemonListItem {
  details: Pokemon;
}

export default function HomeScreen() {
  const [pokemonList, setPokemonList] = useState<PokemonWithDetails[]>([]);
  const [filteredList, setFilteredList] = useState<PokemonWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const loadPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await fetchPokemonList(30); // Load fewer Pokemon initially for better performance
      const detailedList = await Promise.all(
        list.map(async (pokemon) => {
          try {
            const details = await fetchPokemonDetails(pokemon.name);
            return { ...pokemon, details };
          } catch (err) {
            console.warn(`Failed to load details for ${pokemon.name}:`, err);
            // Return pokemon without details if loading fails
            return { ...pokemon, details: null };
          }
        }),
      );
      setPokemonList(detailedList);
      setFilteredList(detailedList);
    } catch (error) {
      console.error("Error loading Pokémon:", error);
      setError("Failed to load Pokémon. Please try again.");
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
        <ActivityIndicator size="large" color={COLORS.primary} />
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
          backgroundColor: COLORS.hero,
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
          const pokemon = item.details;
          const displayName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
          const imageUri = pokemon?.sprites?.front_default;
          const types = pokemon?.types?.map(t => t.type.name) || ['normal'];

          return (
            <TouchableOpacity
              onPress={() => openPokemonDetails(item)}
              className="w-[48%] mb-4"
            >
              <Card className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <View className="flex-row justify-between items-center p-4">
                  <Text className="text-lg font-bold text-gray-900">
                    {displayName}
                  </Text>
                  {pokemon && (
                    <Text className="text-lg font-bold text-gray-900">
                      #{String(pokemon.id).padStart(3, "0")}
                    </Text>
                  )}
                </View>
                <View className="h-32 items-center justify-center p-4">
                  {imageUri ? (
                    <Image
                      source={{ uri: imageUri }}
                      style={{ width: 80, height: 80 }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text className="text-gray-500 text-sm">Loading...</Text>
                  )}
                </View>
                <View className="p-4">
                  <View className="flex-row justify-center items-center gap-2 mt-3">
                    {types.slice(0, 2).map((type, index) => (
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
