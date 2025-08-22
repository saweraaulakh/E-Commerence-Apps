import { Link } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import { FlatList, View, Text, Button, StyleSheet } from 'react-native';
import { useCart } from './CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price
      // quantity will be added automatically by CartContext
    });
  };

  return (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>Price: ${product.price.toFixed(2)}</Text>
      <Button 
        title="Add to Cart" 
        onPress={handleAddToCart}
      />
      <Link href={`/cart`} style={styles.cartLink}>
        <Text style={styles.cartLinkText}>View Cart</Text>
      </Link>
    </View>
  );
}

export default function ProductsScreen() {
  const { data: products } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingBottom: 20,
  },
  productContainer: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  cartLink: {
    marginTop: 10,
  },
  cartLinkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});