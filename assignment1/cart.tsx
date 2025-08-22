import { useContext } from 'react';
import { useCart } from './CartContext';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function CartScreen() {
  const { items, removeItem, clearCart } = useCart();
  const total = items.reduce((sum: number, item: { price: number; quantity: number; }) => sum + (item.price * item.quantity), 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name} x {item.quantity}</Text>
            <Button title="Remove" onPress={() => removeItem(item.id)} />
          </View>
        )}
      />
      
      <Text>Total: ${total.toFixed(2)}</Text>
      <Button title="Clear Cart" onPress={clearCart} />
      <Link href="/products" asChild>
        <Button title="Back to Products" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  itemContainer: { marginBottom: 15 }
});