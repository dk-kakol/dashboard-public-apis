import { createI18n } from 'vue-i18n'
import pl from '@/locales/pl/index'
import en from '@/locales/en/index'

export const messages = {
  pl: {
    ...pl,
  },
  en: {
    ...en,
  },
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: import.meta.env.VITE_APP_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages,
})

export default i18n
