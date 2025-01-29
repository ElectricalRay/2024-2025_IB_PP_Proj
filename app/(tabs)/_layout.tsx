import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs 
        screenOptions={{
            tabBarActiveTintColor: '#ff3d3d',
            tabBarStyle: {
                backgroundColor: '#25292e'
            },
            headerShown: false,
            tabBarHideOnKeyboard: true
        }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
            title: 'Home',
            tabBarIcon: ({color, focused}) => (
                <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24}/>
            )
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
          )
        }}
      />
    </Tabs>
  );
}
