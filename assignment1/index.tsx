import { Link } from 'expo-router';
import { View, Text } from 'react-native'

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to My Shop !</Text>
      
      {/* Products page link */}
      <Link href="/products" style={{ color: 'blue', marginTop: 20 }}>
        View Products
      </Link>
    </View>
  );
}