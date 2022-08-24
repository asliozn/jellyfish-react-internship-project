import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: localStorage.getItem('language') || 'en',
  resources: {
    en: {
      translations: require('./locales/en/translations.json')
    },
    tr: {
      translations: require('./locales/tr/translations.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en', 'tr'];

export default i18n;


