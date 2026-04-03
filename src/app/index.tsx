import EmptyComponent from "@/components/EmptyComponent";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingComponent from "@/components/LoadingComponent";
import PokemonCard from "@/components/PokemonCard";
import { COLORS } from "@/constants/typeColors";
import { usePokemonList } from "@/hooks/usePokemonList";
import { PokemonListItem } from "@/types";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { Appbar, Searchbar, Text } from "react-native-paper";

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: pokemonList,
    loading,
    loadingMore,
    error,
    loadMore,
    refresh,
  } = usePokemonList(8);

  // Search filter
  const filteredList = useMemo(() => {
    if (!searchQuery.trim()) return pokemonList || [];

    const query = searchQuery.toLowerCase().trim();
    return (pokemonList || []).filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query),
    );
  }, [pokemonList, searchQuery]);

  const openPokemonDetails = useCallback(
    (pokemon: PokemonListItem) => {
      router.push(`/pokemon/${pokemon.name}`);
    },
    [router],
  );

  const onRefresh = useCallback(async () => {
    await refresh();
  }, [refresh]);

  // Only allow loading more when NOT searching
  const handleLoadMore = useCallback(() => {
    if (searchQuery.trim() !== "") return; // Disable infinite scroll during search
    loadMore();
  }, [loadMore, searchQuery]);

  if (loading) {
    return <LoadingComponent message="Loading Pokédex..." />;
  }

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header with Search */}
      <Appbar.Header
        style={{
          backgroundColor: COLORS.hero,
          paddingBottom: 24,
        }}
      >
        <View className="flex-1 justify-center items-center px-4">
          <Text
            className="text-2xl font-semibold text-center mb-4"
            style={{ color: COLORS.white }}
          >
            Who are you looking for?
          </Text>

          <View className="w-full">
            <Searchbar
              placeholder="Search Pokémon (e.g. Pikachu)"
              onChangeText={setSearchQuery}
              value={searchQuery}
              className="bg-white rounded-2xl"
              style={{ backgroundColor: COLORS.white, elevation: 2 }}
              inputStyle={{ color: "#1f2937", fontSize: 16 }}
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

      {/* FlatList with Infinite Scroll */}
      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 16,
          gap: 12,
        }}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 40,
          paddingHorizontal: 4,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loadingMore && searchQuery.trim() === "" ? (
            <LoadingComponent message="Loading more Pokémon..." />
          ) : null
        }
        ListEmptyComponent={
          searchQuery.trim() && filteredList.length === 0 ? (
            <EmptyComponent message={searchQuery} />
          ) : null
        }
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
