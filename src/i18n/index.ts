import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import ko from './locales/ko.json'
import ja from './locales/ja.json'

export const defaultNS = 'common'

void i18n
  .use(initReactI18next)
  .init({
    resources: {
      ko: { common: ko },
      en: { common: en },
      ja: { common: ja },
    },
    lng: navigator.language.startsWith('ko') ? 'ko' : navigator.language.startsWith('ja') ? 'ja' : 'en',
    fallbackLng: 'en',
    defaultNS,
    interpolation: {
      escapeValue: false,
    },
  })

export { i18n }

