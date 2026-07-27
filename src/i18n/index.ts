import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { id } from './locales/id'
import { en } from './locales/en'

export const supportedLanguages = [
  { code: 'id', label: 'Bahasa Indonesia', short: 'ID' },
  { code: 'en', label: 'English', short: 'EN' },
] as const

/**
 * Indonesian is the fallback and the default for first-time visitors: the
 * brief requires all customer-facing content to be proper Bahasa Indonesia.
 * English is an opt-in convenience, so detection only honours an explicit
 * stored choice rather than the browser's language.
 */
void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      id: { translation: id },
      en: { translation: en },
    },
    fallbackLng: 'id',
    supportedLngs: ['id', 'en'],
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: 'skinjago.lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  })

export default i18n
