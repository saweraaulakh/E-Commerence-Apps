import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Image, TextInput } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { guestDataStore } from './store';

export default function GuestsScreen() {
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);

  const handleRoomsChange = (value) => {
    if (rooms + value >= 1) {
      setRooms(rooms + value);
    }
  };

  const handleAdultsChange = (value) => {
    if (adults + value >= 1) {
      setAdults(adults + value);
    }
  };

  const handleChildrenChange = (value) => {
    const newChildrenCount = children + value;
    if (newChildrenCount >= 0) {
      setChildren(newChildrenCount);
      // Update childrenAges array when children count changes
      setChildrenAges(prevAges => {
        if (newChildrenCount > prevAges.length) {
          // Add new ages with a default of 10
          return [...prevAges, ...Array(newChildrenCount - prevAges.length).fill(10)];
        } else {
          // Remove ages if children count decreases
          return prevAges.slice(0, newChildrenCount);
        }
      });
    }
  };
  
  const handleChildAgeChange = (age, index) => {
    const newAges = [...childrenAges];
    newAges[index] = parseInt(age) || 0;
    setChildrenAges(newAges);
  };

  const handleContinue = () => {
    guestDataStore.data = { rooms, adults, children, childrenAges };
    router.back();
  };

  const renderChildrenAges = () => {
    if (children === 0) {
      return null;
    }
    return (
      <View style={styles.childrenAgesContainer}>
        <Text style={styles.childrenAgesTitle}>Ages of children (yrs)</Text>
        <View style={styles.childrenAgesList}>
          {childrenAges.map((age, index) => (
            <TextInput
              key={index}
              style={styles.ageInput}
              keyboardType="numeric"
              maxLength={2}
              value={age.toString()}
              onChangeText={(text) => handleChildAgeChange(text, index)}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="close" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Select Rooms and Guest Count</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Rooms Row */}
        <View style={styles.row}>
          <View style={styles.rowInfo}>
            <MaterialCommunityIcons name="bed-king-outline" size={24} color="#000" />
            <Text style={styles.rowTitle}>Rooms</Text>
          </View>
          <View style={styles.counter}>
            <Pressable style={styles.counterButton} onPress={() => handleRoomsChange(-1)}>
              <Text style={styles.counterText}>-</Text>
            </Pressable>
            <Text style={styles.counterValue}>{rooms}</Text>
            <Pressable style={styles.counterButton} onPress={() => handleRoomsChange(1)}>
              <Text style={styles.counterText}>+</Text>
            </Pressable>
          </View>
        </View>

        {/* Adults Row */}
        <View style={styles.row}>
          <View style={styles.rowInfo}>
            <MaterialIcons name="person-outline" size={24} color="#000" />
            <Text style={styles.rowTitle}>Adults</Text>
          </View>
          <View style={styles.counter}>
            <Pressable style={styles.counterButton} onPress={() => handleAdultsChange(-1)}>
              <Text style={styles.counterText}>-</Text>
            </Pressable>
            <Text style={styles.counterValue}>{adults}</Text>
            <Pressable style={styles.counterButton} onPress={() => handleAdultsChange(1)}>
              <Text style={styles.counterText}>+</Text>
            </Pressable>
          </View>
        </View>

        {/* Children Row */}
        <View style={styles.row}>
          <View style={styles.rowInfo}>
            <MaterialIcons name="child-care" size={24} color="#000" />
            <View>
              <Text style={styles.rowTitle}>Children</Text>
              <Text style={styles.rowSubtitle}>17 Years or less</Text>
            </View>
          </View>
          <View style={styles.counter}>
            <Pressable style={styles.counterButton} onPress={() => handleChildrenChange(-1)}>
              <Text style={styles.counterText}>-</Text>
            </Pressable>
            <Text style={styles.counterValue}>{children}</Text>
            <Pressable style={styles.counterButton} onPress={() => handleChildrenChange(1)}>
              <Text style={styles.counterText}>+</Text>
            </Pressable>
          </View>
        </View>
        
        {renderChildrenAges()}

        {/* Currency Row (Dummy) */}
        <View style={styles.row}>
          <View style={styles.rowInfo}>
            <MaterialIcons name="attach-money" size={24} color="#000" />
            <Text style={styles.rowTitle}>Currency</Text>
          </View>
          <View style={styles.currencyContainer}>
            <Image source={require('./assets/sar-flag.png')} style={styles.currencyFlag} />
            <Text style={styles.currencyText}>SAR</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#888" />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.summaryText}>{rooms} Room - {adults} Adults - {children} Children</Text>
        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
  rowSubtitle: {
    fontSize: 12,
    color: '#888',
    marginLeft: 10,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ff6600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    color: '#ff6600',
    fontSize: 20,
    fontWeight: 'bold',
  },
  counterValue: {
    fontSize: 18,
    marginHorizontal: 15,
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  currencyFlag: {
    width: 24,
    height: 16,
    marginRight: 5,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    padding: 20,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  continueButton: {
    backgroundColor: '#ff6600',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  childrenAgesContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  childrenAgesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  childrenAgesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  ageInput: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
  },
});