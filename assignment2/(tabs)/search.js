import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// Import components
import { strings } from '../strings/strings';
import { colors } from '../styles/colors';
import { searchStyles } from '../styles/searchStyles'; // `searchStyles` ko import kiya gaya

// Dummy data for mock locations

const mockLocations = [
  { id: '1', city: 'London', country: 'United Kingdom' },
 { id: '2', city: 'New York', country: 'United States' },
 { id: '3', city: 'Paris', country: 'France' },
 { id: '4', city: 'Tokyo', country: 'Japan' },
 { id: '5', city: 'Dubai', country: 'United Arab Emirates' },
 { id: '6', city: 'Sydney', country: 'Australia' },
 { id: '7', city: 'Rome', country: 'Italy' },
 { id: '8', city: 'Lahore', country: 'Pakistan' }
];

export default function SearchScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    if (searchText) {
      const filtered = popularDestinations.filter(
        (dest) =>
          dest.city.toLowerCase().includes(searchText.toLowerCase()) ||
          dest.country.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [searchText]);

  const handleCitySelect = (city) => {
    setSearchText(city);
    router.replace({ pathname: '/', params: { destination: city } });
  };

  return (
    <View style={searchStyles.container}>
      <View style={searchStyles.header}>
        <Pressable onPress={() => router.back()} style={searchStyles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text style={searchStyles.headerTitle}>{strings.searchScreenTitle}</Text>
      </View>
      <View style={searchStyles.searchBar}>
        <MaterialIcons name="search" size={24} color={colors.darkGray} />
        <TextInput
          style={searchStyles.searchInput}
          placeholder={strings.searchPlaceholder}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        data={filteredCities.length > 0 ? filteredCities : popularDestinations}
        keyExtractor={(item) => item.city}
        renderItem={({ item }) => (
          <Pressable style={searchStyles.locationItem} onPress={() => handleCitySelect(item.city)}>
            <View style={searchStyles.locationIcon}>
              <MaterialIcons name="location-city" size={24} color={colors.primary} />
            </View>
            <View>
              <Text style={searchStyles.locationCity}>{item.city}</Text>
              <Text style={searchStyles.locationCountry}>{item.country}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
