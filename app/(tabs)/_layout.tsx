import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext } from "react";
import { ThemeContext } from "@/constants/ThemeContext";

export default function TabLayout() {
  const theme = useContext(ThemeContext)
  if (!theme) return null;

  return (
    <Tabs 
        screenOptions={{
            tabBarActiveTintColor: theme.accentColor,
            tabBarStyle: {
                backgroundColor: theme.primaryColor,
                height: 60,
                borderColor: '#7b7c7d'
            },
            headerShown: false,
            tabBarHideOnKeyboard: true,
        }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
            title: 'Home',
            tabBarIcon: ({color, focused}) => (
                <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24}/>
            ),
        }} 
      />
      <Tabs.Screen 
        name="weekly" 
        options={{ 
            title: 'Weekly', 
            tabBarIcon: ({color, focused}) => (
                <MaterialCommunityIcons name={focused ? 'view-week' : 'view-week-outline'} color={color} size={24}/>
            )
        }} 
      />
      <Tabs.Screen
        name='calender'
        options={{
          title: "Calender",
          tabBarIcon: ({color, focused}) => (
            <Ionicons name={focused ? 'calendar-sharp' : 'calendar-outline'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: "Settings",
          tabBarIcon: ({color, focused}) => (
            <Ionicons name={focused ? 'settings-sharp' : 'settings-outline'} color={color} size={24}/>
          )
        }}
      />
    </Tabs>
  );
}
