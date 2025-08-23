import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Alert, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { useFocusEffect } from '@react-navigation/native';
import { guestDataStore } from '../store';

// A simple placeholder component for the Visas screen.
const VisasScreen = () => (
  <View style={styles.contentPlaceholder}>
    <Text style={styles.contentPlaceholderText}>Visas content goes here</Text>
  </View>
);

// A simple placeholder component for the Schools screen.
const SchoolsScreen = () => (
  <View style={styles.contentPlaceholder}>
    <Text style={styles.contentPlaceholderText}>Schools content goes here</Text>
  </View>
);

// Array of texts to display in the "Why Direct?" section
const dynamicTexts = [
  'More than 2.5 million choices on our platform',
  'We provide best value for your money',
  'Get your instant visa with us!',
  'Book the best schools for your kids',
];

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRange, setSelectedRange] = useState({});
  const [selectedDatesText, setSelectedDatesText] = useState('Select your dates');
  const [destinationText, setDestinationText] = useState('Where are you going?');
  const [guestsText, setGuestsText] = useState('1 Room - 2 Adults - 0 Children');
  const [activeTab, setActiveTab] = useState('Hotels');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (guestDataStore.data) {
        const { rooms, adults, children, childrenAges } = guestDataStore.data;
        let agesText = '';
        if (parseInt(children) > 0) {
          agesText = `(${childrenAges?.map(age => `${age} yrs`).join(', ') || ''})`;
        }
        setGuestsText(`${rooms} Room - ${adults} Adults - ${children} Children ${agesText}`);
        guestDataStore.data = null;
      }
    }, [])
  );

  useEffect(() => {
    if (params.city) {
      setDestinationText(params.city);
      setShowCalendar(true);
    }
  }, [params.city]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prevIndex => (prevIndex + 1) % dynamicTexts.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  
  const onDayPress = (day) => {
    if (Object.keys(selectedRange).length === 0) {
      setSelectedRange({
        [day.dateString]: { selected: true, startingDay: true, color: '#ff6600', textColor: 'white' },
      });
      setSelectedDatesText(`${day.dateString}`);
      setShowConfirmButton(false);
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
      setSelectedDatesText(`${startDate} - ${endDate} | ${diffDays} nights`);
      setShowConfirmButton(true);
    }
  };
  
  const handleConfirm = () => {
    setShowCalendar(false);
  };

  const goToGuestsScreen = () => {
    router.push('/guests');
  };

  const handleSearch = () => {
    if (destinationText === 'Where are you going?' ||
        selectedDatesText === 'Select your dates' ||
        guestsText === '1 Room - 2 Adults - 0 Children') {
      Alert.alert('Missing Information', 'Please fill in all the details before searching for hotels.');
    } else {
      Alert.alert('Searching...', 'Finding the best hotels for you!');
    }
  };
  
  const renderTab = (tabName, iconName) => (
    <Pressable
      style={[styles.tab, activeTab === tabName && styles.activeTab]}
      onPress={() => setActiveTab(tabName)}
    >
      <MaterialIcons
        name={iconName}
        size={24}
        color={activeTab === tabName ? '#ff6600' : '#fff'}
      />
      <Text
        style={[styles.tabText, activeTab === tabName && styles.activeTabText]}
      >
        {tabName}
      </Text>
    </Pressable>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Visas':
        return <VisasScreen />;
      case 'Schools':
        return <SchoolsScreen />;
      case 'Hotels':
      default:
        return (
          <View>
            <Pressable style={styles.inputField} onPress={() => router.push('/search')}>
              <MaterialIcons name="location-on" size={24} color="#888" />
              <Text style={styles.text}>{destinationText}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="#888" style={styles.dropdownIcon} />
            </Pressable>
            
            <Pressable style={styles.inputField} onPress={toggleCalendar}>
              <MaterialIcons name="calendar-today" size={24} color="#888" />
              <Text style={styles.text}>{selectedDatesText}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="#888" style={styles.dropdownIcon} />
            </Pressable>
            
            {showCalendar && (
              <View style={styles.calendarContainer}>
                <Text style={styles.calendarHeader}>Select your dates</Text>
                <Calendar
                  onDayPress={onDayPress}
                  markedDates={selectedRange}
                  markingType={'period'}
                  hideArrows={true}
                  theme={{
                    todayTextColor: '#ff6600',
                    textDayHeaderFontSize: 12,
                    textDayHeaderFontWeight: 'bold',
                    textMonthFontWeight: 'bold',
                    monthTextColor: '#000',
                    selectedDayBackgroundColor: '#ff6600',
                    selectedDayTextColor: '#fff',
                    'stylesheet.calendar.header': {
                      header: {
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 10,
                      },
                      monthText: {
                        fontSize: 18,
                        fontWeight: 'bold',
                      },
                      arrow: {
                        display: 'none',
                      }
                    }
                  }}
                />
                
                {showConfirmButton && (
                  <View style={styles.confirmSection}>
                    <Text style={styles.selectedDatesText}>{selectedDatesText}</Text>
                    <Pressable style={styles.confirmButton} onPress={handleConfirm}>
                      <Text style={styles.confirmButtonText}>CONFIRM</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            )}
      
            <Pressable style={styles.inputField} onPress={goToGuestsScreen}>
              <MaterialIcons name="people" size={24} color="#888" />
              <Text style={styles.text}>{guestsText}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="#888" style={styles.dropdownIcon} />
            </Pressable>
      
            <Pressable style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>SEARCH</Text>
            </Pressable>
          </View>
        );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>Direct</Text>
      </View>
      
      {/* Main Content Container with Tabs */}
      <View style={styles.mainContainer}>
        {/* Tab bar for Visas, Hotels, Schools */}
        <View style={styles.tabBar}>
          {renderTab('Visas', 'credit-card')}
          {renderTab('Hotels', 'hotel')}
          {renderTab('Schools', 'school')}
        </View>
  
        {/* Main content based on active tab */}
        <View style={styles.mainContent}>
          {renderContent()}
  
          <View style={styles.whyDirectSection}>
            <Text style={styles.whyDirectTitle}>Why Direct?</Text>
            <Text style={styles.whyDirectText}>{dynamicTexts[currentTextIndex]}</Text>
          </View>
    
          <View style={styles.partnersSection}>
            <Text style={styles.partnersTitle}>In Partnership with</Text>
            <View style={styles.logoContainer}>
              <Image source={require('../assets/travelport-logo.png')} style={styles.logo} />
              <Image source={require('../assets/sabre-logo.png')} style={styles.logo} />
              <Image source={require('../assets/amadeus-logo.png')} style={styles.logo} />
              <Image source={require('../assets/booking-logo.png')} style={styles.logo} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff6600', // Pora screen orange hoga
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  tab: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: '#ff6600',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
    marginTop: 5,
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#ff6600',
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#888',
    marginLeft: 10,
  },
  dropdownIcon: {
    marginLeft: 'auto',
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
  whyDirectSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  whyDirectTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  whyDirectText: {
    fontSize: 16,
    color: '#666',
  },
  partnersSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  partnersTitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  logo: {
    width: 60,
    height: 20,
    resizeMode: 'contain',
  },
  calendarContainer: {
    marginBottom: 20,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  calendarHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  confirmSection: {
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 10,
  },
  selectedDatesText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#ff6600',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentPlaceholder: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentPlaceholderText: {
    fontSize: 20,
    color: '#ccc',
  },
});