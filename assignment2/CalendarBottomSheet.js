import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Modal, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

// Import global styles
import { colors } from './styles/colors';
import { fontSizes, fontWeights } from './styles/fonts';

// Component for the Calendar Bottom Sheet
const CalendarBottomSheet = ({ isVisible, onClose, onSave }) => {
  const [selectedRange, setSelectedRange] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  const onDayPress = (day) => {
    let newSelectedRange = { ...selectedRange };
    if (!newSelectedRange.startDate) {
      newSelectedRange.startDate = day.dateString;
      newSelectedRange.endDate = null;
    } else if (!newSelectedRange.endDate) {
      if (day.dateString >= newSelectedRange.startDate) {
        newSelectedRange.endDate = day.dateString;
      } else {
        newSelectedRange.startDate = day.dateString;
        newSelectedRange.endDate = null;
      }
    } else {
      newSelectedRange.startDate = day.dateString;
      newSelectedRange.endDate = null;
    }
    setSelectedRange(newSelectedRange);

    const newMarkedDates = {};
    if (newSelectedRange.startDate) {
      newMarkedDates[newSelectedRange.startDate] = {
        selected: true,
        startingDay: true,
        color: colors.primary, // Using global color
        textColor: colors.white, // Using global color
      };
    }
    if (newSelectedRange.endDate) {
      const start = new Date(newSelectedRange.startDate);
      const end = new Date(newSelectedRange.endDate);
      let date = start;
      while (date <= end) {
        const dateString = date.toISOString().slice(0, 10);
        newMarkedDates[dateString] = {
          selected: true,
          color: colors.primary, // Using global color
          textColor: colors.white, // Using global color
        };
        date.setDate(date.getDate() + 1);
      }
      newMarkedDates[newSelectedRange.startDate].startingDay = true;
      newMarkedDates[newSelectedRange.endDate].endingDay = true;
    }
    setMarkedDates(newMarkedDates);
  };

  const handleContinue = () => {
    if (selectedRange.startDate && selectedRange.endDate) {
      const start = new Date(selectedRange.startDate);
      const end = new Date(selectedRange.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const formattedStartDate = new Date(start).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
      const formattedEndDate = new Date(end).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

      onSave({
        text: `${formattedStartDate} - ${formattedEndDate} (${diffDays} nights)`,
        startDate: selectedRange.startDate,
        endDate: selectedRange.endDate,
      });
      onClose();
    } else {
      Alert.alert("Missing Information", "Please select both a start and end date.");
    }
  };


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={calendarStyles.modalOverlay}>
        <View style={calendarStyles.container}>
          <View style={calendarStyles.header}>
            <Pressable onPress={onClose} style={calendarStyles.backButton}>
              <MaterialIcons name="close" size={fontSizes.hero} color={colors.black} /> {/* Using global styles */}
            </Pressable>
            <Text style={calendarStyles.headerTitle}>Select Dates</Text>
          </View>
          <ScrollView contentContainerStyle={calendarStyles.content}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={markedDates}
              markingType={'period'}
              hideExtraDays={true}
              enableSwipeMonths={true}
              theme={{
                selectedDayBackgroundColor: colors.primary, // Using global color
                selectedDayTextColor: colors.white, // Using global color
                todayTextColor: colors.primary, // Using global color
                arrowColor: colors.primary, // Using global color
                textDayFontSize: fontSizes.large, // Using global font size
                textMonthFontSize: fontSizes.xLarge, // Using global font size
                textDayHeaderFontSize: fontSizes.medium, // Using global font size
                textMonthFontWeight: fontWeights.bold, // Using global font weight
              }}
            />
          </ScrollView>
          <View style={calendarStyles.footer}>
            <Pressable style={calendarStyles.continueButton} onPress={handleContinue}>
              <Text style={calendarStyles.continueButtonText}>CONTINUE</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const calendarStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.modalOverlay, // Using global color
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.background, // Using global color
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 15,
    height: 'auto',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray, // Using global color
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    fontSize: fontSizes.xxLarge, // Using global font size
    fontWeight: fontWeights.bold, // Using global font weight
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.mediumGray, // Using global color
    padding: 20,
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: colors.primary, // Using global color
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  continueButtonText: {
    color: colors.white, // Using global color
    fontSize: fontSizes.xLarge, // Using global font size
    fontWeight: fontWeights.bold, // Using global font weight
  },
});

export default CalendarBottomSheet;
