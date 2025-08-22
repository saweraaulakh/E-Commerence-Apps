import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { CartProvider } from './CartContext';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <CartProvider>
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="products" />
        <Stack.Screen name="cart" />
      </Stack>
    </QueryClientProvider>
    </CartProvider>
  );
}