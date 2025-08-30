import { StyleSheet } from 'react-native';

// Import colors and fonts
import { colors } from './colors';
import { fontSizes, fontWeights } from './fonts';

// Global styles for your app.
// You can define common styles here and reuse them.
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: fontSizes.xxLarge,
    fontWeight: fontWeights.bold,
  },
  // Aur bhi common styles yahan define kar sakte hain
});

// Re-export colors and fonts for a single import statement
export { colors } from './colors';
export { fontSizes, fontWeights } from './fonts';
