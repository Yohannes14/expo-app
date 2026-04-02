import { PokemonApi } from "@/services/pokemon.service";
import { Pokemon } from "@/types";
import { useEffect, useState } from "react";

export const usePokemonDetails = (
  nameOrId: string | number | null | undefined,
) => {
  const [data, setData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Don't fetch if nameOrId is empty
    if (!nameOrId) {
      setData(null);
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await PokemonApi.fetchPokemonDetails(nameOrId);
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch Pokémon details"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [nameOrId]);

  return { data, loading, error };
};
