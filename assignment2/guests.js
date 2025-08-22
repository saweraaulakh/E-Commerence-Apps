import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { guestDataStore } from './store'; // Import the shared data store to save data
import { Picker } from '@react-native-picker/picker'; // Import Picker

export default function GuestsScreen() {
  const router = useRouter();
  
  // States to manage the number of rooms, adults, and children, as well as children's ages.
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  
  // List of mock currencies
  const currencies = ['USD', 'EUR', 'GBP', 'PKR', 'INR'];

  // This function is triggered when the user presses the 'Done' button.
  const handleDonePress = () => {
    // Basic validation to ensure all children have a valid age specified.
    if (children > 0 && childrenAges.some(age => age === '' || isNaN(age) || parseInt(age) > 17)) {
      Alert.alert('Incomplete', 'Please ensure all children have an age (1-17) specified.');
      return;
    }
    
    // Save the collected guest data to the global store so the Home screen can access it.
    guestDataStore.data = {
      rooms,
      adults,
      children,
      childrenAges,
      selectedCurrency,
    };
    
    console.log("Data saved to shared store:", guestDataStore.data);
    
    // Navigate back to the previous screen.
    router.back();
  };

  // Function to handle the increment and decrement of guest counts.
  const handleCountChange = (type, action) => {
    if (type === 'rooms') {
      if (action === 'increment') setRooms(prev => prev + 1);
      if (action === 'decrement' && rooms > 1) setRooms(prev => prev - 1);
    } else if (type === 'adults') {
      if (action === 'increment') setAdults(prev => prev + 1);
      if (action === 'decrement' && adults > 1) setAdults(prev => prev - 1);
    } else if (type === 'children') {
      if (action === 'increment') {
        setChildren(prev => prev + 1);
        setChildrenAges(prev => [...prev, '']);
      }
      if (action === 'decrement' && children > 0) {
        setChildren(prev => prev - 1);
        setChildrenAges(prev => prev.slice(0, -1));
      }
    }
  };

  // Function to update the age of a specific child.
  const handleAgeChange = (index, text) => {
    const newAges = [...childrenAges];
    const age = text.replace(/[^0-9]/g, '');
    if (age !== '' && parseInt(age) > 17) {
      Alert.alert('Invalid Age', 'Child age must be 17 or less.');
      newAges[index] = '';
    } else {
      newAges[index] = age;
    }
    setChildrenAges(newAges);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rooms and Guests</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Counter for Rooms */}
        <View style={styles.counterRow}>
          <Text style={styles.labelText}>Rooms</Text>
          <View style={styles.counterButtons}>
            <Pressable onPress={() => handleCountChange('rooms', 'decrement')}>
              <MaterialIcons name="remove-circle-outline" size={30} color="#ff6600" />
            </Pressable>
            <Text style={styles.countText}>{rooms}</Text>
            <Pressable onPress={() => handleCountChange('rooms', 'increment')}>
              <MaterialIcons name="add-circle-outline" size={30} color="#ff6600" />
            </Pressable>
          </View>
        </View>

        {/* Counter for Adults */}
        <View style={styles.counterRow}>
          <Text style={styles.labelText}>Adults</Text>
          <View style={styles.counterButtons}>
            <Pressable onPress={() => handleCountChange('adults', 'decrement')}>
              <MaterialIcons name="remove-circle-outline" size={30} color="#ff6600" />
            </Pressable>
            <Text style={styles.countText}>{adults}</Text>
            <Pressable onPress={() => handleCountChange('adults', 'increment')}>
              <MaterialIcons name="add-circle-outline" size={30} color="#ff6600" />
            </Pressable>
          </View>
        </View>

        {/* Counter for Children */}
        <View style={styles.counterRow}>
          <Text style={styles.labelText}>Children</Text>
          <View style={styles.counterButtons}>
            <Pressable onPress={() => handleCountChange('children', 'decrement')}>
              <MaterialIcons name="remove-circle-outline" size={30} color="#ff6600" />
            </Pressable>
            <Text style={styles.countText}>{children}</Text>
            <Pressable onPress={() => handleCountChange('children', 'increment')}>
              <MaterialIcons name="add-circle-outline" size={30} color="#ff6600" />
            </Pressable>
          </View>
        </View>

        {/* Input fields for children's ages, only visible if children count is > 0 */}
        {children > 0 && (
          <View style={styles.childrenAgeContainer}>
            <Text style={styles.ageTitle}>What is the age of the children?</Text>
            {[...Array(children)].map((_, index) => (
              <TextInput
                key={index}
                style={styles.ageInput}
                placeholder={`Child ${index + 1} age (1-17)`}
                keyboardType="numeric"
                onChangeText={(text) => handleAgeChange(index, text)}
                value={childrenAges[index]}
              />
            ))}
          </View>
        )}

        {/* Currency Picker */}
        <View style={styles.currencyContainer}>
          <Text style={styles.label}>Currency</Text>
          <Picker
            selectedValue={selectedCurrency}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCurrency(itemValue)
            }
            style={styles.picker}
          >
            {currencies.map((currency) => (
              <Picker.Item key={currency} label={currency} value={currency} />
            ))}
          </Picker>
        </View>

      </ScrollView>

      {/* Done button to finalize the guest count and navigate back */}
      <View style={styles.doneButtonContainer}>
        <Pressable style={styles.doneButton} onPress={handleDonePress}>
          <Text style={styles.doneButtonText}>Done</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  counterButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    fontSize: 20,
    marginHorizontal: 15,
  },
  childrenAgeContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  ageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ageInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  doneButtonContainer: {
    marginTop: 'auto',
    marginBottom: 20,
    alignItems: 'center',
  },
  doneButton: {
    backgroundColor: '#ff6600',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    flex: 1,
  },
});