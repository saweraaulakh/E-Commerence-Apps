import { StyleSheet } from 'react-native';


export const guestsStyles = StyleSheet.create({
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
