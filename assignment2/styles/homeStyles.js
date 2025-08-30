import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FF6600',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  mainContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingTop: 20,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#FF6600',
  },
  tabText: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  activeTabText: {
    color: '#FF6600',
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    marginLeft: 10,
    flex: 1,
  },
  dropdownIcon: {
    marginLeft: 'auto',
  },
  searchButton: {
    backgroundColor: '#FF6600',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
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
  calendarModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  calendarHeader: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  calendarHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confirmSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  selectedDatesText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  contentPlaceholderText: {
    fontSize: 18,
    color: '#888',
  },
});
