import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { useFocusEffect } from '@react-navigation/native';
import { guestDataStore } from '../store'; // Ensure this path is correct

// A simple placeholder component for the My Requests screen.
const MyRequestsScreen = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabText}>My Requests Screen</Text>
  </View>
);

// A simple placeholder component for the Visa Required screen.
const VisaRequiredScreen = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabText}>Visa Required Screen</Text>
  </View>
);

// A simple placeholder component for the More screen.
const MoreScreen = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabText}>More Screen</Text>
  </View>
);

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // State for the main booking form
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRange, setSelectedRange] = useState({});
  const [selectedDatesText, setSelectedDatesText] = useState('Select your dates');
  const [destinationText, setDestinationText] = useState('Where are you going?');
  const [guestsText, setGuestsText] = useState('1 Room - 2 Adults - 0 Children');
  
  // This effect handles data from the guests screen
  useFocusEffect(
    React.useCallback(() => {
      if (guestDataStore.data) {
        const { rooms, adults, children, childrenAges } = guestDataStore.data;
        let agesText = '';
        if (parseInt(children) > 0) {
          agesText = `(${childrenAges.map(age => `${age} yrs`).join(', ')})`;
        }
        setGuestsText(`${rooms} Room - ${adults} Adults - ${children} Children ${agesText}`);
        guestDataStore.data = null;
      }
    }, [])
  );

  // This effect handles data from the search screen
  useEffect(() => {
    if (params.city) {
      setDestinationText(params.city);
    }
  }, [params.city]);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  
  const onDayPress = (day) => {
    if (Object.keys(selectedRange).length === 0) {
      setSelectedRange({
        [day.dateString]: { selected: true, startingDay: true, color: '#ff6600', textColor: 'white' },
      });
      setSelectedDatesText(`${day.dateString}`);
    } else {
      const dates = Object.keys(selectedRange);
      const startDate = dates[0];
      const endDate = day.dateString;
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const newRange = {};
      const loop = new Date(start);
      while (loop <= end) {
        const dateString = loop.toISOString().split('T')[0];
        const isStart = dateString === startDate;
        const isEnd = dateString === endDate;
        newRange[dateString] = {
          selected: true,
          color: '#ff6600',
          textColor: 'white',
          startingDay: isStart,
          endingDay: isEnd,
        };
        const newDate = loop.setDate(loop.getDate() + 1);
        loop.setTime(newDate);
      }
      setSelectedRange(newRange);
      setSelectedDatesText(`${startDate} - ${endDate} | ${diffDays} days`);
      setShowCalendar(false);
    }
  };
  
  const goToGuestsScreen = () => {
    router.push('/guests');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Hotel Booking</Text>
      
      {/* Booking Form */}
      <Pressable style={styles.inputField} onPress={() => router.push('/search')}>
        <MaterialIcons name="location-on" size={24} color="#888" />
        <Text style={styles.text}>{destinationText}</Text>
      </Pressable>
      
      <Pressable style={styles.inputField} onPress={toggleCalendar}>
        <MaterialIcons name="calendar-today" size={24} color="#888" />
        <Text style={styles.text}>{selectedDatesText}</Text>
      </Pressable>
      
      {showCalendar && (
        <View style={styles.calendarContainer}>
          <Calendar onDayPress={onDayPress} markedDates={selectedRange} markingType={'period'} />
        </View>
      )}

      <Pressable style={styles.inputField} onPress={goToGuestsScreen}>
        <MaterialIcons name="people" size={24} color="#888" />
        <Text style={styles.text}>{guestsText}</Text>
      </Pressable>

      <Pressable style={styles.searchButton}>
        <Text style={styles.searchButtonText}>SEARCH</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#888',
  },
  searchButton: {
    backgroundColor: '#ff6600',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
});