import ErrorComponent from "@/components/ErrorComponent";
import LoadingComponent from "@/components/LoadingComponent";
import PokemonCard from "@/components/PokemonCard";
import { COLORS } from "@/constants/typeColors";
import { usePokemonList } from "@/hooks/usePokemonList";
import { PokemonListItem } from "@/types";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Appbar, Searchbar, Text } from "react-native-paper";

export default function HomeScreen() {
  const router = useRouter();

  const {
    data: pokemonList,
    loading: listLoading,
    error: listError,
  } = usePokemonList(20, 0);

  const [searchQuery, setSearchQuery] = useState("");

  // Search filter
  const filteredList = useMemo(() => {
    if (!searchQuery.trim()) {
      return pokemonList;
    }

    const query = searchQuery.toLowerCase().trim();
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query),
    );
  }, [pokemonList, searchQuery]);

  const openPokemonDetails = (pokemon: PokemonListItem) => {
    router.push(`/pokemon/${pokemon.name}`);
  };

  if (listLoading) {
    return <LoadingComponent message="Loading Pokédex..." />;
  }

  // Show Error Screen
  if (listError) {
    return <ErrorComponent message={listError.message} />;
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
            className="text-2xl font-semibold text-center mb-4"
            style={{ color: COLORS.white }}
          >
            Who are you looking for?
          </Text>
          <View className="w-full relative justify-center">
            <Searchbar
              placeholder="Search Pokémon (e.g. Pikachu)"
              onChangeText={setSearchQuery}
              value={searchQuery}
              className="bg-white rounded-2xl"
              style={{
                backgroundColor: COLORS.white,
                elevation: 2,
              }}
              inputStyle={{
                color: "#1f2937",
                fontSize: 16,
              }}
              icon="magnify"
              iconColor="#64748b"
              right={(props) => (
                <TouchableOpacity
                  onPress={() => {}}
                  style={{
                    marginRight: 8,
                    backgroundColor: "#1f2937",
                    paddingHorizontal: 16,
                    paddingVertical: 6,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      fontWeight: "600",
                      fontSize: 13,
                    }}
                  >
                    Go
                  </Text>
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
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            details={item.details}
            openDetails={() => openPokemonDetails(item)}
          />
        )}
      />
    </View>
  );
}
