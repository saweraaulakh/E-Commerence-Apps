import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

// Dummy data for mock locations
const mockLocations = [
  { id: '1', city: 'London', country: 'United Kingdom' },
  { id: '2', city: 'New York', country: 'United States' },
  { id: '3', city: 'Paris', country: 'France' },
  { id: '4', city: 'Tokyo', country: 'Japan' },
  { id: '5', city: 'Dubai', country: 'United Arab Emirates' },
  { id: '6', city: 'Sydney', country: 'Australia' },
  { id: '7', city: 'Rome', country: 'Italy' },
  {id:  '8', city: 'Lahore', country: 'Pakistan'}
];

export default function SearchScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  // Filter locations based on user input
  const filteredLocations = mockLocations.filter(location => 
    location.city.toLowerCase().includes(searchText.toLowerCase()) || 
    location.country.toLowerCase().includes(searchText.toLowerCase())
  );

  // Function to handle location selection
  const handleSelectLocation = (location) => {
    // Navigate back to the previous screen (index.js) and pass data as a URL parameter
    router.push({
      pathname: '/',
      params: { city: location.city },
    });
  };

  const renderLocationItem = ({ item }) => (
    <Pressable
      style={styles.locationItem}
      onPress={() => handleSelectLocation(item)}
    >
      <MaterialIcons name="location-on" size={24} color="#888" />
      <View style={styles.locationTextContainer}>
        <Text style={styles.locationCity}>{item.city}</Text>
        <Text style={styles.locationCountry}>{item.country}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={24} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a city..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        data={filteredLocations}
        renderItem={renderLocationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  locationTextContainer: {
    marginLeft: 10,
  },
  locationCity: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationCountry: {
    fontSize: 14,
    color: '#888',
  },
});
