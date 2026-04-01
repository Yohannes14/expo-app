// app/services/pokeApi.ts
import { Pokemon, PokemonListItem } from "@/types";
import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

// Toggle this to switch between the real API and mock data
export const USE_MOCK_POKEAPI = true;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockPokemonList: PokemonListItem[] = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
  { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
  { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
  { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" },
  { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" },
  { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
  { name: "wartortle", url: "https://pokeapi.co/api/v2/pokemon/8/" },
  { name: "blastoise", url: "https://pokeapi.co/api/v2/pokemon/9/" },
  { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
];

const mockPokemonDetails: Record<string, Pokemon> = {
  bulbasaur: {
    id: 1,
    name: "bulbasaur",
    height: 7,
    weight: 69,
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    },
    types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
    stats: [
      { base_stat: 45, stat: { name: "hp" } },
      { base_stat: 49, stat: { name: "attack" } },
      { base_stat: 49, stat: { name: "defense" } },
      { base_stat: 65, stat: { name: "special-attack" } },
      { base_stat: 65, stat: { name: "special-defense" } },
      { base_stat: 45, stat: { name: "speed" } },
    ],
    moves: [
      { move: { name: "tackle" } },
      { move: { name: "vine-whip" } },
      { move: { name: "razor-wind" } },
    ],
  },
  ivysaur: {
    id: 2,
    name: "ivysaur",
    height: 10,
    weight: 130,
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    },
    types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
    stats: [
      { base_stat: 60, stat: { name: "hp" } },
      { base_stat: 62, stat: { name: "attack" } },
      { base_stat: 63, stat: { name: "defense" } },
      { base_stat: 80, stat: { name: "special-attack" } },
      { base_stat: 80, stat: { name: "special-defense" } },
      { base_stat: 60, stat: { name: "speed" } },
    ],
    moves: [
      { move: { name: "vine-whip" } },
      { move: { name: "poison-powder" } },
    ],
  },
  venusaur: {
    id: 3,
    name: "venusaur",
    height: 20,
    weight: 1000,
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    },
    types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
    stats: [
      { base_stat: 80, stat: { name: "hp" } },
      { base_stat: 82, stat: { name: "attack" } },
      { base_stat: 83, stat: { name: "defense" } },
      { base_stat: 100, stat: { name: "special-attack" } },
      { base_stat: 100, stat: { name: "special-defense" } },
      { base_stat: 80, stat: { name: "speed" } },
    ],
    moves: [{ move: { name: "razor-leaf" } }, { move: { name: "solar-beam" } }],
  },
  charmander: {
    id: 4,
    name: "charmander",
    height: 6,
    weight: 85,
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    },
    types: [{ type: { name: "fire" } }],
    stats: [
      { base_stat: 39, stat: { name: "hp" } },
      { base_stat: 52, stat: { name: "attack" } },
      { base_stat: 43, stat: { name: "defense" } },
      { base_stat: 60, stat: { name: "special-attack" } },
      { base_stat: 50, stat: { name: "special-defense" } },
      { base_stat: 65, stat: { name: "speed" } },
    ],
    moves: [{ move: { name: "ember" } }, { move: { name: "flamethrower" } }],
  },
  charmeleon: {
    id: 5,
    name: "charmeleon",
    height: 11,
    weight: 190,
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
    },
    types: [{ type: { name: "fire" } }],
    stats: [
      { base_stat: 58, stat: { name: "hp" } },
      { base_stat: 64, stat: { name: "attack" } },
      { base_stat: 58, stat: { name: "defense" } },
      { base_stat: 80, stat: { name: "special-attack" } },
      { base_stat: 65, stat: { name: "special-defense" } },
      { base_stat: 80, stat: { name: "speed" } },
    ],
    moves: [
      { move: { name: "flamethrower" } },
      { move: { name: "fire-spin" } },
    ],
  },
  charizard: {
    id: 6,
    name: "charizard",
    height: 17,
    weight: 905,
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    },
    types: [{ type: { name: "fire" } }, { type: { name: "flying" } }],
    stats: [
      { base_stat: 78, stat: { name: "hp" } },
      { base_stat: 84, stat: { name: "attack" } },
      { base_stat: 78, stat: { name: "defense" } },
      { base_stat: 109, stat: { name: "special-attack" } },
      { base_stat: 85, stat: { name: "special-defense" } },
      { base_stat: 100, stat: { name: "speed" } },
    ],
    moves: [{ move: { name: "flamethrower" } }, { move: { name: "fly" } }],
  },
  squirtle: {
    id: 7,
    name: "squirtle",
    height: 5,
    weight: 90,
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    },
    types: [{ type: { name: "water" } }],
    stats: [
      { base_stat: 44, stat: { name: "hp" } },
      { base_stat: 48, stat: { name: "attack" } },
      { base_stat: 65, stat: { name: "defense" } },
      { base_stat: 50, stat: { name: "special-attack" } },
      { base_stat: 64, stat: { name: "special-defense" } },
      { base_stat: 43, stat: { name: "speed" } },
    ],
    moves: [{ move: { name: "water-gun" } }, { move: { name: "bubble" } }],
  },
  wartortle: {
    id: 8,
    name: "wartortle",
    height: 10,
    weight: 225,
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
    },
    types: [{ type: { name: "water" } }],
    stats: [
      { base_stat: 59, stat: { name: "hp" } },
      { base_stat: 63, stat: { name: "attack" } },
      { base_stat: 80, stat: { name: "defense" } },
      { base_stat: 65, stat: { name: "special-attack" } },
      { base_stat: 80, stat: { name: "special-defense" } },
      { base_stat: 58, stat: { name: "speed" } },
    ],
    moves: [{ move: { name: "bubble-beam" } }, { move: { name: "surf" } }],
  },
  blastoise: {
    id: 9,
    name: "blastoise",
    height: 16,
    weight: 855,
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
    },
    types: [{ type: { name: "water" } }],
    stats: [
      { base_stat: 79, stat: { name: "hp" } },
      { base_stat: 83, stat: { name: "attack" } },
      { base_stat: 100, stat: { name: "defense" } },
      { base_stat: 85, stat: { name: "special-attack" } },
      { base_stat: 105, stat: { name: "special-defense" } },
      { base_stat: 78, stat: { name: "speed" } },
    ],
    moves: [{ move: { name: "hydro-pump" } }, { move: { name: "water-gun" } }],
  },
  pikachu: {
    id: 25,
    name: "pikachu",
    height: 4,
    weight: 60,
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    },
    types: [{ type: { name: "electric" } }],
    stats: [
      { base_stat: 35, stat: { name: "hp" } },
      { base_stat: 55, stat: { name: "attack" } },
      { base_stat: 40, stat: { name: "defense" } },
      { base_stat: 50, stat: { name: "special-attack" } },
      { base_stat: 50, stat: { name: "special-defense" } },
      { base_stat: 90, stat: { name: "speed" } },
    ],
    moves: [
      { move: { name: "thunder-shock" } },
      { move: { name: "quick-attack" } },
    ],
  },
};

const normalizeKey = (nameOrId: string | number) =>
  String(nameOrId).toString().toLowerCase();

const normalizeSearchKey = (nameOrId: string | number) => {
  const raw = normalizeKey(nameOrId);
  if (raw in mockPokemonDetails) return raw;

  // Handle malformed values like "ld-blastoise"
  if (raw.includes("-")) {
    const candidate = raw.split("-").pop() || raw;
    if (candidate in mockPokemonDetails) return candidate;
  }

  // Strip non-alphanumeric prefixes and suffixes
  const cleaned = raw.replace(/[^a-z0-9]+/g, "");
  if (cleaned in mockPokemonDetails) return cleaned;

  return raw;
};

export const fetchPokemonList = async (
  limit: number = 151,
  offset: number = 0,
): Promise<PokemonListItem[]> => {
  if (USE_MOCK_POKEAPI) {
    await sleep(150);
    return mockPokemonList.slice(offset, offset + limit);
  }

  const response = await axios.get(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );
  return response.data.results;
};

export const fetchPokemonDetails = async (
  nameOrId: string | number,
): Promise<Pokemon> => {
  if (USE_MOCK_POKEAPI) {
    await sleep(120);
    const key = normalizeSearchKey(nameOrId);
    if (mockPokemonDetails[key]) {
      return mockPokemonDetails[key];
    }
    console.warn(
      `Mock Pokemon not found with key="${key}" (original="${nameOrId}")`,
    );

    // fallback for numeric id keys from list
    const found = Object.values(mockPokemonDetails).find(
      (pokemon) => pokemon.id === Number(nameOrId),
    );
    console.log("found:", found);
    if (found) return found;

    throw new Error(`Mock Pokemon not found (nameOrId=${nameOrId})`);
  }

  const response = await axios.get(`${BASE_URL}/pokemon/${nameOrId}`);
  return response.data;
};
