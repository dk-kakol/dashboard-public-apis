import { configure, defineRule } from 'vee-validate';
import { required, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import { messages } from '@/plugins/i18n';

// eslint prefer-regex-literals
const regExp = {
  excludeSpecial: /^[^<>`{}=]*$/i
};

configure({
  generateMessage: localize({
    pl: {
      messages: {
        ...messages.pl.validation
      }
    },
    en: {
      messages: {
        ...messages.en.validation
      }
    }
  })
});
setLocale('pl');

defineRule('required', required);
defineRule('min', min);

defineRule('excludeSpecial', (value: any) => {
  if (!required(value)) return true;

  const reg = regExp.excludeSpecial;
  return value && reg.test(value);
});
