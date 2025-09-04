import { en } from './en';
import { ar } from './ar';

export const strings = {
  en,
  ar,
};

export const getLocalizedStrings = (languageCode) => {
  return strings[languageCode] || strings.en;
};