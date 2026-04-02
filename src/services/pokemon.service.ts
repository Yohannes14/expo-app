import { Config } from "@/config/env";
import { PaginatedResponse, Pokemon, PokemonListItem } from "@/types";
import { createApiClient } from "./client";

const api = createApiClient(Config.api.baseUrl);

export const PokemonApi = {
  fetchPokemonList: async (
    limit: number = 151,
    offset: number = 0,
  ): Promise<PaginatedResponse<PokemonListItem>> => {
    return api.get("/pokemon", {
      params: { limit, offset },
    });
  },

  fetchPokemonDetails: async (nameOrId: string | number): Promise<Pokemon> => {
    return api.get(`/pokemon/${nameOrId}`);
  },
};
