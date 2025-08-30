import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Image, Modal, FlatList, Dimensions, Alert } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { guestDataStore } from './store'; 

// Import global styles
import { colors } from './styles/colors';
import { fontSizes, fontWeights } from './styles/fonts';

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
          <Pressable style={guestsStyles.confirmButton} onPress={onClose}>
            <Text style={guestsStyles.confirmButtonText}>CONFIRM</Text>
          </Pressable>
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
              <MaterialIcons name="close" size={fontSizes.hero} color={colors.black} />
            </Pressable>
            <Text style={guestsStyles.headerTitle}>Select Rooms and Guest Count</Text>
          </View>

          <ScrollView contentContainerStyle={guestsStyles.content}>
            {/* Rooms Row */}
            <View style={guestsStyles.row}>
              <View style={guestsStyles.rowInfo}>
                <MaterialCommunityIcons name="bed-king-outline" size={fontSizes.hero} color={colors.black} />
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
                <MaterialIcons name="person-outline" size={fontSizes.hero} color={colors.black} />
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
                <MaterialIcons name="child-care" size={fontSizes.hero} color={colors.black} />
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
                <MaterialIcons name="attach-money" size={fontSizes.hero} color={colors.black} />
                <Text style={guestsStyles.rowTitle}>Currency</Text>
              </View>
              <View style={guestsStyles.currencyContainer}>
                <Image source={require('./assets/sar-flag.png')} style={guestsStyles.currencyFlag} />
                <Text style={guestsStyles.currencyText}>SAR</Text>
                <MaterialIcons name="keyboard-arrow-down" size={fontSizes.hero} color={colors.darkGray} />
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

const guestsStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.modalOverlay,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 15,
    height: 'auto',
  },
  agePickerContainer: {
    backgroundColor: colors.background,
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
    borderBottomColor: colors.mediumGray,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    fontSize: fontSizes.xxLarge,
    fontWeight: fontWeights.bold,
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
    borderBottomColor: colors.lightGray,
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTitle: {
    fontSize: fontSizes.xLarge,
    marginLeft: 10,
  },
  rowSubtitle: {
    fontSize: fontSizes.small,
    color: colors.darkGray,
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
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    color: colors.primary,
    fontSize: fontSizes.xxLarge,
    fontWeight: fontWeights.bold,
  },
  counterValue: {
    fontSize: fontSizes.xLarge,
    marginHorizontal: 15,
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.mediumGray,
    borderRadius: 5,
    padding: 5,
  },
  currencyFlag: {
    width: 24,
    height: 16,
    marginRight: 5,
  },
  currencyText: {
    fontSize: fontSizes.large,
    fontWeight: fontWeights.bold,
    marginRight: 5,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.mediumGray,
    padding: 20,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: fontSizes.large,
    fontWeight: fontWeights.bold,
    marginBottom: 15,
  },
  continueButton: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  continueButtonText: {
    color: colors.white,
    fontSize: fontSizes.xLarge,
    fontWeight: fontWeights.bold,
  },
  modalTitle: {
    fontSize: fontSizes.xxLarge,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
    marginBottom: 20,
  },
  ageOption: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  ageOptionText: {
    fontSize: fontSizes.xLarge,
    color: colors.textPrimary,
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginHorizontal: 20,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: fontSizes.xLarge,
    fontWeight: fontWeights.bold,
  },
});

export default GuestsBottomSheet;
