import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, fr, hi, zh } from "./translations";

const resources = {
  en: {
    translation: en,
  },
  hi: {
    translation: hi,
  },
  fr: {
    translation: fr,
  },
  zh: {
    translation: zh,
  },
}

i18next.use(initReactI18next).init({
  debug: false,
  lng: 'en',
  compatibilityJSON: 'v4',
  fallbackLng: 'en',
  resources,
})

export default i18next;