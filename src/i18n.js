import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import arabic from "./languages/ar.json"
import polish from "./languages/pl.json"
import english from "./languages/eg.json"
import LanguageDetector from 'i18next-browser-languagedetector';
const resources = {
  en: {
    translation:english
  },
  pl: {
    translation: polish
  },
  ar: {
    translation:arabic
  }
};

i18n.use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    detection:{
      order: ['localStorage',  'htmlTag' ],
      caches: ['localStorage', 'cookie'],
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react :{
      useSuspense : false,
    }
  });

  export default i18n;