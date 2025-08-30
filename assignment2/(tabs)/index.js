import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Modal, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { guestDataStore } from '../../store';
import { calendarDataStore } from '../../store';

// Import local styles and strings
import { strings } from '../../strings/strings';
import { colors } from '../../styles/colors';
import { homeStyles } from '../../styles/homeStyles';
import { fontSizes, fontWeights } from '../../styles/fonts';

// Importing the components from the correct path
import GuestsBottomSheet from '../../GuestsBottomSheet';
import CalendarBottomSheet from '../../CalendarBottomSheet';

const mockCurrencies = [
  { code: 'SAR', name: 'Saudi Riyal' },
  { code: 'USD', name: 'US Dollar' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(strings.tabHotels);
  const [isGuestsModalVisible, setGuestsModalVisible] = useState(false);
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
  const [guestData, setGuestData] = useState(guestDataStore.initialState);
  const [calendarData, setCalendarData] = useState(calendarDataStore.initialState);
  const [destinationText, setDestinationText] = useState(strings.searchPlaceholder);

  const handleGuestsSave = (data) => {
    setGuestData(data);
    setGuestsModalVisible(false);
  };

  const handleCalendarSave = (data) => {
    setCalendarData(data);
    setCalendarModalVisible(false);
  };

  const handleSearch = () => {
    console.log('Searching with:', {
      destination: destinationText,
      guests: guestData,
      dates: calendarData,
    });
  };

  const renderTab = (tabName, iconName) => (
    <Pressable
      style={[homeStyles.tab, activeTab === tabName && homeStyles.activeTab]}
      onPress={() => setActiveTab(tabName)}
    >
      <MaterialIcons
        name={iconName}
        size={fontSizes.hero}
        color={activeTab === tabName ? colors.primary : colors.darkGray}
      />
      <Text
        style={[homeStyles.tabText, activeTab === tabName && homeStyles.activeTabText]}
      >
        {tabName}
      </Text>
    </Pressable>
  );

  const renderContent = () => {
    switch (activeTab) {
      case strings.tabVisas:
        return <Text>Visas Screen Content</Text>;
      case strings.tabSchools:
        return <Text>Schools Screen Content</Text>;
      case strings.tabHotels:
      default:
        return (
          <View>
            <Pressable style={homeStyles.inputField} onPress={() => router.push('/search')}>
              <MaterialIcons name="location-on" size={fontSizes.hero} color={colors.darkGray} />
              <Text style={homeStyles.text}>{destinationText}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={fontSizes.hero} color={colors.darkGray} style={homeStyles.dropdownIcon} />
            </Pressable>

            <Pressable style={homeStyles.inputField} onPress={() => setCalendarModalVisible(true)}>
              <MaterialIcons name="calendar-today" size={fontSizes.hero} color={colors.darkGray} />
              <Text style={homeStyles.text}>
                {calendarData.checkIn && calendarData.checkOut
                  ? `${calendarData.checkIn} - ${calendarData.checkOut}`
                  : strings.selectDatesPlaceholder}
              </Text>
              <MaterialIcons name="keyboard-arrow-down" size={fontSizes.hero} color={colors.darkGray} style={homeStyles.dropdownIcon} />
            </Pressable>

            <Pressable style={homeStyles.inputField} onPress={() => setGuestsModalVisible(true)}>
              <MaterialIcons name="person" size={fontSizes.hero} color={colors.darkGray} />
              <Text style={homeStyles.text}>
                {`${guestData.adults} ${strings.guestsAdults}, ${guestData.children} ${strings.guestsChildren}, ${guestData.rooms} ${strings.guestsRooms}`}
              </Text>
              <MaterialIcons name="keyboard-arrow-down" size={fontSizes.hero} color={colors.darkGray} style={homeStyles.dropdownIcon} />
            </Pressable>

            <Pressable style={homeStyles.searchButton} onPress={handleSearch}>
              <Text style={homeStyles.searchButtonText}>{strings.searchButton}</Text>
            </Pressable>
          </View>
        );
    }
  };

  return (
    <View style={homeStyles.container}>
      <ScrollView contentContainerStyle={homeStyles.scrollContainer}>
        <View style={homeStyles.header}>
          <Text style={homeStyles.headerTitle}>{strings.headerTitle}</Text>
          <MaterialCommunityIcons name="menu" size={fontSizes.hero} color={colors.black} />
        </View>

        <View style={homeStyles.mainContainer}>
          <View style={homeStyles.tabBar}>
            {renderTab(strings.tabHotels, 'hotel')}
            {renderTab(strings.tabVisas, 'credit-card')}
            {renderTab(strings.tabSchools, 'school')}
          </View>
          {renderContent()}
        </View>

        <View style={homeStyles.exploreSection}>
          <Text style={homeStyles.exploreTitle}>{strings.explore}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable style={homeStyles.exploreItem}>
              <MaterialCommunityIcons name="bed-king-outline" size={fontSizes.xLarge} color={colors.primary} />
              <Text style={homeStyles.exploreText}>{strings.hotels}</Text>
            </Pressable>
            <Pressable style={homeStyles.exploreItem}>
              <MaterialIcons name="apartment" size={fontSizes.xLarge} color={colors.primary} />
              <Text style={homeStyles.exploreText}>{strings.apartments}</Text>
            </Pressable>
            <Pressable style={homeStyles.exploreItem}>
              <MaterialIcons name="villa" size={fontSizes.xLarge} color={colors.primary} />
              <Text style={homeStyles.exploreText}>{strings.villas}</Text>
            </Pressable>
            <Pressable style={homeStyles.exploreItem}>
              <MaterialIcons name="business" size={fontSizes.xLarge} color={colors.primary} />
              <Text style={homeStyles.exploreText}>{strings.business}</Text>
            </Pressable>
          </ScrollView>
        </View>
      </ScrollView>

      <GuestsBottomSheet
        isVisible={isGuestsModalVisible}
        onClose={() => setGuestsModalVisible(false)}
        onSave={handleGuestsSave}
      />
      <CalendarBottomSheet
        isVisible={isCalendarModalVisible}
        onClose={() => setCalendarModalVisible(false)}
        onSave={handleCalendarSave}
      />
    </View>
  );
}
