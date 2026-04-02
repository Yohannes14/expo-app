export const Config = {
  api: {
    baseUrl:
      process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://pokeapi.co/api/v2",
    timeout: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT ?? "10000", 10),
  },
  isDev: process.env.NODE_ENV === "development",
} as const;
