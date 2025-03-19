import { configure, defineRule } from 'vee-validate'
import { required, min } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import { messages } from '@/plugins/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import pl from '@vee-validate/i18n/dist/locale/pl.json'
import i18n from '@/plugins/i18n'
import { z } from 'zod'
import { makeZodI18nMap } from 'zod-vue-i18n'

const regExp = {
  excludeSpecial: /^[^<>`{}=]*$/i
}

z.setErrorMap(makeZodI18nMap(i18n))
configure({
  generateMessage: localize({
    pl: {
      messages: {
        ...pl.messages,
        ...messages.pl.validation
      }
    },
    en: {
      messages: {
        ...en.messages,
        ...messages.en.validation
      }
    }
  })
})
setLocale('pl')

defineRule('required', required)
defineRule('min', min)

defineRule('excludeSpecial', (value: string) => {
  if (!required(value)) return true

  const reg = regExp.excludeSpecial
  return value && reg.test(value)
})
