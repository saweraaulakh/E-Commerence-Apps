import { StyleSheet, I18nManager } from 'react-native';
import { colors } from './colors';
import { fontSizes, fontWeights } from './fonts';

export const homeStyles_ar = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    position: 'relative',
    backgroundColor: colors.primary,
  },
  headerTitle: {
    color: 'white',
    fontSize: fontSizes.extraLarge,
    fontWeight: fontWeights.bold,
  },
  languageButton: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
  languageButtonText: {
    color: 'white',
    fontSize: fontSizes.medium,
    fontWeight: fontWeights.semiBold,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  tabBar: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
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
    borderColor: colors.primary,
  },
  tabText: {
    color: colors.darkGray,
    fontSize: fontSizes.small,
    marginTop: 5,
  },
  activeTabText: {
    fontWeight: fontWeights.bold,
    color: colors.primary,
  },
  inputField: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    flex: 1,
    fontSize: fontSizes.medium,
    color: colors.darkGray,
    marginHorizontal: 10,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  dropdownIcon: {
    marginLeft: 'auto',
  },
  searchButton: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  searchButtonText: {
    color: colors.white,
    fontSize: fontSizes.large,
    fontWeight: fontWeights.bold,
  },
  exploreSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  exploreTitle: {
    fontSize: fontSizes.large,
    fontWeight: fontWeights.bold,
    marginBottom: 10,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  exploreItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  exploreText: {
    marginTop: 5,
    fontSize: fontSizes.small,
    color: colors.darkGray,
    textAlign: 'center',
  },
});
