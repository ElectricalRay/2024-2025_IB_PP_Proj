import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "@/constants/ThemeContext";
import { useContext } from "react";
import { ThemeContext } from "@/constants/ThemeContext";

export default function RootLayout() {

  return (
    <ThemeProvider>
      <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        <Stack.Screen name="+not-found"/>
      </Stack>
      <StatusBar style="light"/>
      </>
    </ThemeProvider>
  );
}
//navigationBarColor: useContext(ThemeContext).primaryColor
