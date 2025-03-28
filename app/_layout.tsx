import { Ionicons } from '@expo/vector-icons';
import { COLORS } from "@/constants/colors";
import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return <Tabs screenOptions={{
    headerShadowVisible: false,
    headerStyle:{
      backgroundColor: COLORS.background,
    },
    headerTintColor: COLORS.text,
    headerTitleStyle:{
      fontWeight: 'bold',
    },
    tabBarStyle:{
      backgroundColor: COLORS.background,
      borderTopColor: COLORS.text,
      borderTopWidth: 1,
    },
    tabBarActiveTintColor: COLORS.text,
    tabBarInactiveTintColor: COLORS.inactive,
  }}>
    <Tabs.Screen
    name="people"
    options={{
      title: 'All Characters',
      tabBarLabel: 'Characters',
      headerShown: false,
      tabBarIcon: ({ color, size }) =>(
        <Ionicons name="people-outline" size={size} color={color} />
      )
    }}
    />
    <Tabs.Screen
    name="films"
    options={{
      title: 'All Films',
      tabBarLabel: 'Films',
      headerShown: false,
      tabBarIcon: ({ color, size }) =>(
        <Ionicons name="film-outline" size={size} color={color} />
      )
    }}
    />
    <Tabs.Screen
    name="favorites"
    options={{
      title: 'My Favorites',
      tabBarIcon: ({ color, size }) =>(
        <Ionicons name="star" size={size} color={color} />
      )
    }}
    />
    <Tabs.Screen 
    name="index"
    options={{ href: null,
    }} 
    />
  </Tabs>;
}
