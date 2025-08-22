import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';

export default function CalendarScreen() {
  const router = useRouter();
  const [selectedDates, setSelectedDates] = useState({});

  // Jab koi date select hoti hai, to yeh function chalega.
  const onDayPress = (day) => {
    const newDates = {};
    if (selectedDates[day.dateString]) {
      // Agar pehle se select hai to deselect karein
      delete selectedDates[day.dateString];
    } else {
      // Agar select nahi hai to select karein
      newDates[day.dateString] = { selected: true, selectedColor: '#ff6600' };
    }
    setSelectedDates({ ...selectedDates, ...newDates });
  };
  
  // Dates select karne ke baad is button se wapas jayenge.
  const handleDonePress = () => {
    const datesArray = Object.keys(selectedDates).sort();
    if (datesArray.length > 0) {
      const startDate = datesArray[0];
      const endDate = datesArray[datesArray.length - 1];
      const dateString = `${startDate} - ${endDate}`;
      router.setParams({ dates: dateString });
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your dates</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={selectedDates}
        markingType={'simple'}
        style={styles.calendar}
      />
      
      <View style={styles.buttonContainer}>
        <Button
          title="Done"
          onPress={handleDonePress}
          color="#ff6600"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  calendar: {
    marginBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 'auto',
    marginBottom: 20,
  }
});