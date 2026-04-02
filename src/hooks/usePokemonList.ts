import { PokemonApi } from "@/services/pokemon.service";
import { PaginatedResponse, Pokemon, PokemonListItem } from "@/types";
import { useEffect, useState } from "react";

interface PokemonWithDetails extends PokemonListItem {
  details: Pokemon | null;
}

export const usePokemonList = (limit: number = 20, offset: number = 0) => {
  const [data, setData] = useState<PokemonWithDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWithDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // First get the basic list
        const listResponse: PaginatedResponse<PokemonListItem> =
          await PokemonApi.fetchPokemonList(limit, offset);

        // Then fetch details for each pokemon
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

        setData(detailedList);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch Pokémon"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWithDetails();
  }, [limit, offset]);

  return {
    data,
    loading,
    error,
  };
};
