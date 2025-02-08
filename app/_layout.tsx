import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "@/constants/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false, navigationBarColor: '#25292e'}}/>
        <Stack.Screen name="+not-found"/>
      </Stack>
      <StatusBar style="light"/>
      </>
    </ThemeProvider>
  );
}
