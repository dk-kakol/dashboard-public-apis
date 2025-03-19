import 'vuetify/styles'
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  theme: {
    defaultTheme: 'dark'
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      fa,
      mdi
    }
  }
})
