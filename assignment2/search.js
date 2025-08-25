import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

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
  const [searchText, setSearchText] = useState('');
  
  // Filter locations based on user input
  const filteredLocations = mockLocations.filter(location => 
    location.city.toLowerCase().includes(searchText.toLowerCase()) || 
    location.country.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectLocation = (location) => {
    // Yehi woh line hai jo data pass karti hai. Iska theek hona zaroori hai.
    router.setParams({ city: location.city }); 
    router.back(); 
  };
  
  const renderLocationItem = ({ item }) => (
    <Pressable style={styles.locationItem} onPress={() => handleSelectLocation(item)}>
      <View style={styles.locationIcon}>
        <MaterialIcons name="location-on" size={24} color="#888" />
      </View>
      <View>
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
          autoFocus={true}
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
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locationIcon: {
    marginRight: 15,
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