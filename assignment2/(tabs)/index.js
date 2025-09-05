import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Modal, I18nManager } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { guestDataStore, calendarDataStore } from '../store';

// Import local strings and styles
import { strings } from '../strings/strings';
import { colors } from '../styles/colors';
import { homeStyles } from '../styles/homeStyles';
import { homeStyles_ar } from '../styles/homeStyles_ar';
import { fontSizes, fontWeights } from '../styles/fonts';

import GuestsBottomSheet from '../GuestsBottomSheet';
import CalendarBottomSheet from '../CalendarBottomSheet';

const mockCurrencies = [
  { code: 'SAR', name: 'Saudi Riyal' },
  { code: 'USD', name: 'US Dollar' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(strings.en.tabHotels);
  const [isGuestsModalVisible, setGuestsModalVisible] = useState(false);
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
  const [guestData, setGuestData] = useState(guestDataStore.initialState);
  const [calendarData, setCalendarData] = useState(calendarDataStore.initialState);
  const [language, setLanguage] = useState('en');

  // Use the getLocalizedStrings function to get the correct language
  const localizedStrings = strings[language];

  useEffect(() => {
    // This will toggle the layout direction for RTL languages like Arabic
    const isRTL = language === 'ar';
    I18nManager.forceRTL(isRTL);
    I18nManager.allowRTL(isRTL);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

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
      destination: localizedStrings.searchPlaceholder,
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
      case localizedStrings.tabVisas:
        return <Text>Visas Screen Content</Text>;
      case localizedStrings.tabSchools:
        return <Text>Schools Screen Content</Text>;
      case localizedStrings.tabHotels:
      default:
        return (
          <View>
            <Pressable style={homeStyles.inputField} onPress={() => router.push('/search')}>
              <MaterialIcons name="location-on" size={fontSizes.hero} color={colors.darkGray} />
              <Text style={homeStyles.text}>{localizedStrings.searchPlaceholder}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={fontSizes.hero} color={colors.darkGray} style={homeStyles.dropdownIcon} />
            </Pressable>

            <Pressable style={homeStyles.inputField} onPress={() => setCalendarModalVisible(true)}>
              <MaterialIcons name="calendar-today" size={fontSizes.hero} color={colors.darkGray} />
              <Text style={homeStyles.text}>
                {calendarData.checkIn && calendarData.checkOut
                  ? `${calendarData.checkIn} - ${calendarData.checkOut}`
                  : localizedStrings.selectDatesPlaceholder}
              </Text>
              <MaterialIcons name="keyboard-arrow-down" size={fontSizes.hero} color={colors.darkGray} style={homeStyles.dropdownIcon} />
            </Pressable>

            <Pressable style={homeStyles.inputField} onPress={() => setGuestsModalVisible(true)}>
              <MaterialIcons name="person" size={fontSizes.hero} color={colors.darkGray} />
              <Text style={homeStyles.text}>
                {`${guestData.adults} ${localizedStrings.guestsAdults}, ${guestData.children} ${localizedStrings.guestsChildren}, ${guestData.rooms} ${localizedStrings.guestsRooms}`}
              </Text>
              <MaterialIcons name="keyboard-arrow-down" size={fontSizes.hero} color={colors.darkGray} style={homeStyles.dropdownIcon} />
            </Pressable>

            <Pressable style={homeStyles.searchButton} onPress={handleSearch}>
              <Text style={homeStyles.searchButtonText}>{localizedStrings.searchButton}</Text>
            </Pressable>
          </View>
        );
    }
  };

  return (
    <View style={homeStyles.container}>
      <ScrollView contentContainerStyle={homeStyles.scrollContainer}>
        <View style={homeStyles.header}>
          <Text style={homeStyles.headerTitle}>{localizedStrings.headerTitle}</Text>
          <Pressable onPress={toggleLanguage} style={homeStyles.languageButton}>
            <Text style={homeStyles.languageButtonText}>{language === 'en' ? 'عربي' : 'EN'}</Text>
          </Pressable>
        </View>

        <View style={homeStyles.mainContainer}>
          <View style={homeStyles.tabBar}>
            {renderTab(localizedStrings.tabHotels, 'hotel')}
            {renderTab(localizedStrings.tabVisas, 'credit-card')}
            {renderTab(localizedStrings.tabSchools, 'school')}
          </View>
          {renderContent()}
        </View>

        <View style={homeStyles.exploreSection}>
          <Text style={homeStyles.exploreTitle}>{localizedStrings.explore}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable style={homeStyles.exploreItem}>
              <MaterialCommunityIcons name="bed-king-outline" size={fontSizes.xLarge} color={colors.primary} />
              <Text style={homeStyles.exploreText}>{localizedStrings.hotels}</Text>
            </Pressable>
            <Pressable style={homeStyles.exploreItem}>
              <MaterialIcons name="apartment" size={fontSizes.xLarge} color={colors.primary} />
              <Text style={homeStyles.exploreText}>{localizedStrings.apartments}</Text>
            </Pressable>
            <Pressable style={homeStyles.exploreItem}>
              <MaterialIcons name="villa" size={fontSizes.xLarge} color={colors.primary} />
              <Text style={homeStyles.exploreText}>{localizedStrings.villas}</Text>
            </Pressable>
            <Pressable style={homeStyles.exploreItem}>
              <MaterialIcons name="business" size={fontSizes.xLarge} color={colors.primary} />
              <Text style={homeStyles.exploreText}>{localizedStrings.business}</Text>
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

