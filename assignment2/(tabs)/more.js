import { View, Text, StyleSheet } from 'react-native';

// This is the screen component for the 'More' tab.
export default function MoreScreen() {
  return (
    <View style={styles.container}>
      {/* A simple Text component to show that the screen is working */}
      <Text style={styles.text}>More Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});