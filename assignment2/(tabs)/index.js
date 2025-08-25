import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Image, Modal, Dimensions, FlatList, Alert } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { useFocusEffect } from '@react-navigation/native';
import { guestDataStore } from '../store';

// Age options to be displayed in the modal
const AGE_OPTIONS = [
  'Less than 1 year old',
  '1 Year old',
  '2 Years old',
  '3 Years old',
  '4 Years old',
  '5 Years old',
  '6 Years old',
  '7 Years old',
  '8 Years old',
  '9 Years old',
  '10 Years old',
  '11 Years old',
  '12 Years old',
  '13 Years old',
  '14 Years old',
  '15 Years old',
  '16 Years old',
  '17 Years old',
];

// Component for the Age Picker Modal
const AgePickerModal = ({ isVisible, onClose, onSelectAge }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={guestsStyles.modalOverlay}>
        <View style={guestsStyles.agePickerContainer}>
          <Text style={guestsStyles.modalTitle}>Select Child Age</Text>
          <FlatList
            data={AGE_OPTIONS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable style={guestsStyles.ageOption} onPress={() => onSelectAge(item)}>
                <Text style={guestsStyles.ageOptionText}>{item}</Text>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View style={guestsStyles.separator} />}
          />
        </View>
      </View>
    </Modal>
  );
};

// Component for the Guests Bottom Sheet
const GuestsBottomSheet = ({ isVisible, onClose, onSave }) => {
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [showAgePickerModal, setShowAgePickerModal] = useState(false);
  const [currentChildIndex, setCurrentChildIndex] = useState(null);

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
      const newChildrenAges = [...childrenAges];
      if (value > 0) {
        newChildrenAges.push(10); // Add a placeholder age for the new child
        setChildrenAges(newChildrenAges);
        setCurrentChildIndex(newChildrenCount - 1);
        setShowAgePickerModal(true);
      } else {
        setChildrenAges(newChildrenAges.slice(0, newChildrenCount));
      }
    }
  };

  const handleSelectAge = (selectedAgeText) => {
    if (currentChildIndex !== null) {
      const newAges = [...childrenAges];
      const ageInNumber = parseInt(selectedAgeText) || 0;
      newAges[currentChildIndex] = ageInNumber;
      setChildrenAges(newAges);
    }
    setShowAgePickerModal(false);
  };

  const handleContinue = () => {
    onSave({ rooms, adults, children, childrenAges });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={guestsStyles.modalOverlay}>
        <View style={guestsStyles.container}>
          <View style={guestsStyles.header}>
            <Pressable onPress={onClose} style={guestsStyles.backButton}>
              <MaterialIcons name="close" size={24} color="#000" />
            </Pressable>
            <Text style={guestsStyles.headerTitle}>Select Rooms and Guest Count</Text>
          </View>

          <ScrollView contentContainerStyle={guestsStyles.content}>
            {/* Rooms Row */}
            <View style={guestsStyles.row}>
              <View style={guestsStyles.rowInfo}>
                <MaterialCommunityIcons name="bed-king-outline" size={24} color="#000" />
                <Text style={guestsStyles.rowTitle}>Rooms</Text>
              </View>
              <View style={guestsStyles.counter}>
                <Pressable style={guestsStyles.counterButton} onPress={() => handleRoomsChange(-1)}>
                  <Text style={guestsStyles.counterText}>-</Text>
                </Pressable>
                <Text style={guestsStyles.counterValue}>{rooms}</Text>
                <Pressable style={guestsStyles.counterButton} onPress={() => handleRoomsChange(1)}>
                  <Text style={guestsStyles.counterText}>+</Text>
                </Pressable>
              </View>
            </View>

            {/* Adults Row */}
            <View style={guestsStyles.row}>
              <View style={guestsStyles.rowInfo}>
                <MaterialIcons name="person-outline" size={24} color="#000" />
                <Text style={guestsStyles.rowTitle}>Adults</Text>
              </View>
              <View style={guestsStyles.counter}>
                <Pressable style={guestsStyles.counterButton} onPress={() => handleAdultsChange(-1)}>
                  <Text style={guestsStyles.counterText}>-</Text>
                </Pressable>
                <Text style={guestsStyles.counterValue}>{adults}</Text>
                <Pressable style={guestsStyles.counterButton} onPress={() => handleAdultsChange(1)}>
                  <Text style={guestsStyles.counterText}>+</Text>
                </Pressable>
              </View>
            </View>

            {/* Children Row */}
            <View style={guestsStyles.row}>
              <View style={guestsStyles.rowInfo}>
                <MaterialIcons name="child-care" size={24} color="#000" />
                <View>
                  <Text style={guestsStyles.rowTitle}>Children</Text>
                  <Text style={guestsStyles.rowSubtitle}>17 Years or less</Text>
                </View>
              </View>
              <View style={guestsStyles.counter}>
                <Pressable style={guestsStyles.counterButton} onPress={() => handleChildrenChange(-1)}>
                  <Text style={guestsStyles.counterText}>-</Text>
                </Pressable>
                <Text style={guestsStyles.counterValue}>{children}</Text>
                <Pressable style={guestsStyles.counterButton} onPress={() => handleChildrenChange(1)}>
                  <Text style={guestsStyles.counterText}>+</Text>
                </Pressable>
              </View>
            </View>

            {/* Currency Row */}
            <View style={guestsStyles.row}>
              <View style={guestsStyles.rowInfo}>
                <MaterialIcons name="attach-money" size={24} color="#000" />
                <Text style={guestsStyles.rowTitle}>Currency</Text>
              </View>
              <View style={guestsStyles.currencyContainer}>
                <Image source={require('../assets/sar-flag.png')} style={guestsStyles.currencyFlag} />
                <Text style={guestsStyles.currencyText}>SAR</Text>
                <MaterialIcons name="keyboard-arrow-down" size={24} color="#888" />
              </View>
            </View>
          </ScrollView>

          <View style={guestsStyles.footer}>
            <Text style={guestsStyles.summaryText}>{rooms} Room - {adults} Adults - {children} Children</Text>
            <Pressable style={guestsStyles.continueButton} onPress={handleContinue}>
              <Text style={guestsStyles.continueButtonText}>CONTINUE</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* The Age Picker Modal is now rendered here */}
      <AgePickerModal
        isVisible={showAgePickerModal}
        onClose={() => setShowAgePickerModal(false)}
        onSelectAge={handleSelectAge}
      />
    </Modal>
  );
};

// Component for the Calendar Bottom Sheet
const CalendarBottomSheet = ({ isVisible, onClose, onSave }) => {
  const [selectedRange, setSelectedRange] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onDayPress = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
      setSelectedRange({
        [day.dateString]: { startingDay: true, color: '#ff6600', textColor: 'white' },
      });
    } else {
      const newRange = { ...selectedRange };
      const start = new Date(startDate.dateString);
      const end = new Date(day.dateString);
      const dateList = [];
      let currentDate = new Date(start);
      while (currentDate <= end) {
        dateList.push(new Date(currentDate).toISOString().slice(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const markedDates = {};
      dateList.forEach((date, index) => {
        if (index === 0) {
          markedDates[date] = { startingDay: true, color: '#ff6600', textColor: 'white' };
        } else if (index === dateList.length - 1) {
          markedDates[date] = { endingDay: true, color: '#ff6600', textColor: 'white' };
        } else {
          markedDates[date] = { color: '#ff6600', textColor: 'white' };
        }
      });
      setEndDate(day);
      setSelectedRange(markedDates);
    }
  };

  const handleContinue = () => {
    if (startDate && endDate) {
      onSave({ startDate, endDate });
    } else {
      alert("Please select both a start and end date.");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={guestsStyles.modalOverlay}>
        <View style={guestsStyles.container}>
          <View style={guestsStyles.header}>
            <Pressable onPress={onClose} style={guestsStyles.backButton}>
              <MaterialIcons name="close" size={24} color="#000" />
            </Pressable>
            <Text style={guestsStyles.headerTitle}>Select Dates</Text>
          </View>
          <ScrollView contentContainerStyle={guestsStyles.content}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={selectedRange}
              markingType={'period'}
              hideExtraDays={true}
              enableSwipeMonths={true}
            />
          </ScrollView>
          <View style={guestsStyles.footer}>
            <Pressable style={guestsStyles.continueButton} onPress={handleContinue}>
              <Text style={guestsStyles.continueButtonText}>CONTINUE</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};


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

const dynamicTexts = [
  'More than 2.5 million choices on our platform',
  'We provide best value for your money',
  'Get your instant visa with us!',
  'Book the best schools for your kids',
];

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedDatesText, setSelectedDatesText] = useState('Select your dates');
  const [destinationText, setDestinationText] = useState('Where are you going?');
  const [guestsText, setGuestsText] = useState('1 Room - 2 Adults - 0 Children');
  const [activeTab, setActiveTab] = useState('Hotels');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showGuestsModal, setShowGuestsModal] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Check for guest data
      if (guestDataStore.data) {
        const { rooms, adults, children, childrenAges } = guestDataStore.data;
        let agesText = '';
        if (parseInt(children) > 0) {
          agesText = `(${childrenAges?.map(age => `${age} yrs`).join(', ') || ''})`;
        }
        setGuestsText(`${rooms} Room - ${adults} Adults - ${children} Children ${agesText}`);
        guestDataStore.data = null;
      }

      // Check for destination data from params
      console.log('Received city param:', params.city); // <-- Ye line add karein
      if (params.city) {
        setDestinationText(params.city);
      }
    }, [params.city])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prevIndex => (prevIndex + 1) % dynamicTexts.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  const handleGuestsSave = (data) => {
    const { rooms, adults, children, childrenAges } = data;
    let agesText = '';
    if (parseInt(children) > 0) {
      agesText = `(${childrenAges?.map(age => `${age} yrs`).join(', ') || ''})`;
    }
    setGuestsText(`${rooms} Room - ${adults} Adults - ${children} Children ${agesText}`);
    setShowGuestsModal(false);
  };

  const handleCalendarSave = ({ startDate, endDate }) => {
    const formattedStartDate = new Date(startDate.year, startDate.month - 1, startDate.day).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    const formattedEndDate = new Date(endDate.year, endDate.month - 1, endDate.day).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    setSelectedDatesText(`${formattedStartDate} - ${formattedEndDate}`);
    setShowCalendarModal(false);
  };
  
  const renderTab = (tabName, iconName) => (
    <Pressable
      style={[styles.tab, activeTab === tabName && styles.activeTab]}
      onPress={() => setActiveTab(tabName)}
    >
      <MaterialIcons
        name={iconName}
        size={24}
        color={activeTab === tabName ? '#ff6600' : '#888'}
      />
      <Text
        style={[styles.tabText, activeTab === tabName && styles.activeTabText]}
      >
        {tabName}
      </Text>
    </Pressable>
  );
  
  const handleSearch = () => {
    if (destinationText === 'Where are you going?' ||
        selectedDatesText === 'Select your dates' ||
        guestsText === '1 Room - 2 Adults - 0 Children') {
      Alert.alert('Missing Information', 'Please fill in all the details before searching for hotels.');
    } else {
      Alert.alert('Searching...', 'Finding the best hotels for you!');
    }
  };

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
            
            <Pressable style={styles.inputField} onPress={() => setShowCalendarModal(true)}>
              <MaterialIcons name="calendar-today" size={24} color="#888" />
              <Text style={styles.text}>{selectedDatesText}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="#888" style={styles.dropdownIcon} />
            </Pressable>
            
            <Pressable style={styles.inputField} onPress={() => setShowGuestsModal(true)}>
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

      <GuestsBottomSheet
        isVisible={showGuestsModal}
        onClose={() => setShowGuestsModal(false)}
        onSave={handleGuestsSave}
      />
      
      <CalendarBottomSheet
        isVisible={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        onSave={handleCalendarSave}
      />
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

const guestsStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 15,
    height: 'auto',
  },
  agePickerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 15,
    maxHeight: Dimensions.get('window').height * 0.5,
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
  // Age Picker Modal styles
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  ageOption: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  ageOptionText: {
    fontSize: 18,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
  },
  confirmButton: {
    backgroundColor: '#ff6600',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
