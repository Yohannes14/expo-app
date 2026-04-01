import { Stack } from "expo-router";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#2563eb" },
            headerTintColor: "#fff",
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: "bold" },
            contentStyle: { backgroundColor: "#f8fafc" },
          }}
        >
          <Stack.Screen name="index" options={{ title: "" }} />
          <Stack.Screen name="pokemon/[id]" options={{ title: "" }} />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
