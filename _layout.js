import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          title: 'Select a Destination',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="guests"
        options={{
          title: 'Rooms and Guests',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}