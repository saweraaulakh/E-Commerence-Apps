import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fontSizes, fontWeights } from './fonts';

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
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
    color: colors.white,
    fontSize: fontSizes.hero,
    fontWeight: fontWeights.bold,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
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
    borderColor: colors.primary,
  },
  tabText: {
    color: colors.darkGray,
    fontSize: fontSizes.medium,
    marginTop: 5,
  },
  activeTabText: {
    fontWeight: fontWeights.bold,
    color: colors.primary,
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    flex: 1,
    fontSize: fontSizes.large,
    color: colors.darkGray,
    marginLeft: 10,
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
    fontSize: fontSizes.xLarge,
    fontWeight: fontWeights.bold,
  },
  whyDirectSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  whyDirectTitle: {
    fontSize: fontSizes.xxxLarge,
    fontWeight: fontWeights.bold,
    marginBottom: 5,
  },
  whyDirectText: {
    fontSize: fontSizes.large,
    color: colors.textSecondary,
  },
  partnersSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  partnersTitle: {
    fontSize: fontSizes.medium,
    color: colors.darkGray,
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
  contentPlaceholder: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentPlaceholderText: {
    fontSize: fontSizes.xxLarge,
    color: colors.mediumGray,
  },
});
