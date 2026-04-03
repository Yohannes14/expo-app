import { COLORS } from "@/constants/typeColors";
import { Stack } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.hero,
            },
            headerTintColor: COLORS.white,
            headerShadowVisible: false,
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 18,
            },
            contentStyle: {
              backgroundColor: COLORS.background,
            },
            headerRight: () => (
              <View style={{ marginRight: 0 }}>
                <Image
                  source={require("@/assets/images/img1.png")}
                  style={{
                    width: 120,
                    height: 120,
                    resizeMode: "contain",
                  }}
                />
              </View>
            ),
          }}
        >
          <Stack.Screen name="index" options={{ title: "" }} />
          <Stack.Screen name="pokemon/[id]" options={{ title: "" }} />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
