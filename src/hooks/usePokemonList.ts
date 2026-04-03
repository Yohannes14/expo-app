import { PokemonApi } from "@/services/pokemon.service";
import { PaginatedResponse, Pokemon, PokemonListItem } from "@/types";
import { useCallback, useEffect, useState } from "react";

interface PokemonWithDetails extends PokemonListItem {
  details: Pokemon | null;
}

export const usePokemonList = (limit: number = 12) => {
  const [data, setData] = useState<PokemonWithDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Initial fetch + fetch more
  const fetchPokemon = useCallback(
    async (isLoadMore = false) => {
      try {
        if (isLoadMore) {
          setLoadingMore(true);
        } else {
          setLoading(true);
          setError(null);
        }

        const listResponse: PaginatedResponse<PokemonListItem> =
          await PokemonApi.fetchPokemonList(limit, offset);

        // Fetch details for each Pokémon
        const detailedList: PokemonWithDetails[] = await Promise.all(
          listResponse.results.map(async (pokemon: PokemonListItem) => {
            try {
              const details = await PokemonApi.fetchPokemonDetails(
                pokemon.name,
              );
              return { ...pokemon, details };
            } catch (err) {
              console.warn(`Failed to load details for ${pokemon.name}`);
              return { ...pokemon, details: null };
            }
          }),
        );

        if (isLoadMore) {
          setData((prev) => [...prev, ...detailedList]);
        } else {
          setData(detailedList);
        }

        // Check if there are more items
        const newOffset = offset + limit;
        setHasMore(!!listResponse.next && newOffset < listResponse.count);
        setOffset(newOffset);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err : new Error("Failed to fetch Pokémon");
        setError(errorMessage);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [limit, offset],
  );

  // Initial load
  useEffect(() => {
    fetchPokemon(false);
  }, []); // Only run once on mount

  // Load more function to be used in FlatList onEndReached
  const loadMore = useCallback(() => {
    if (loading || loadingMore || !hasMore) return;
    fetchPokemon(true);
  }, [loading, loadingMore, hasMore, fetchPokemon]);

  // Refresh function
  const refresh = useCallback(() => {
    setOffset(0);
    setData([]);
    setHasMore(true);
    fetchPokemon(false);
  }, [fetchPokemon]);

  return {
    data,
    loading, // Initial loading
    loadingMore, // Loading more at bottom
    error,
    hasMore,
    loadMore,
    refresh,
  };
};
