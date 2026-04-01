import { COLORS } from "@/constants/typeColors";
import { Stack } from "expo-router";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        {/* <StatusBar /> */}
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.hero },
            headerTintColor: COLORS.white,
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: "bold" },
            contentStyle: { backgroundColor: COLORS.background },
          }}
        >
          <Stack.Screen name="index" options={{ title: "" }} />
          <Stack.Screen name="pokemon/[id]" options={{ title: "" }} />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
