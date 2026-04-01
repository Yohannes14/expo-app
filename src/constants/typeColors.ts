export const typeColors: Record<string, string> = {
  grass: "#55B46E",
  poison: "#5A3CF0",
  fire: "#f97316",
  water: "#3b82f6",
  electric: "#facc15",
  bug: "#84cc16",
  normal: "#94a3b8",
  flying: "#38bdf8",
  fighting: "#dc2626",
  ground: "#f59e0b",
  rock: "#78716c",
  ghost: "#6366f1",
  steel: "#71717a",
  psychic: "#ec4899",
  ice: "#22d3ee",
  dragon: "#8b5cf6",
  dark: "#1f2937",
  fairy: "#f472b6",
};

export const getTypeColor = (type: string): string => {
  return typeColors[type.toLowerCase()] || "#6b7280";
};

export const COLORS = {
  hero: "#0F23B4",
  white: "#fff",
  background: "#f8fafc",
  primary: "#2563eb",
  dark: "#1f2937",
  gray: "#64748b",
  darkBg: "#1E1E23",
  green: "#22c55e",
  red: "#ef4444",
  yellow: "#eab308",
  blue: "#3b82f6",
};
