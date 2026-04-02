export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
  };
  types: Array<{
    type: { name: string };
  }>;
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  height: number;
  weight: number;
  moves: Array<{
    move: { name: string };
  }>;
}

export interface PokemonListItem {
  name: string;
  url: string;
}
