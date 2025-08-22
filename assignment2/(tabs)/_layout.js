import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ff6600', // Sets the color of the active tab.
        headerShown: false, // Hides the header at the top of the screen.
      }}
    >
      {/* Tab 1: Home */}
      <Tabs.Screen
        name="index" // The file name for this screen (e.g., app/(tabs)/index.js).
        options={{
          title: 'Home', // The label displayed on the tab bar.
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      
      {/* Tab 2: My Request */}
      <Tabs.Screen
        name="my-requests"
        options={{
          title: 'My Requests',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list-alt" size={size} color={color} />
          ),
        }}
      />

      {/* Tab 3: Visa Required */}
      <Tabs.Screen
        name="visa-required"
        options={{
          title: 'Visa Required',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="description" size={size} color={color} />
          ),
        }}
      />

      {/* Tab 4: More */}
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="more-horiz" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
