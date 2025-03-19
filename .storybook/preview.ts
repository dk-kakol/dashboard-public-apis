import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import vuetify from '@/plugins/vuetify'
import i18n from '@/plugins/i18n'
import { createPinia } from 'pinia'
import '@/plugins/vee-validate'
import initDirectives from '@/directives'
import { withVuetifyTheme } from './withVuetifyTheme.decorator'

setup((app) => {
  app.use(vuetify)
  app.use(i18n)
  app.use(createPinia())
  initDirectives(app)
})

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    viewport: {
      viewports: {
        extraSmallMobile: {
          name: 'Extra Small Mobile (not supported)',
          styles: {
            width: '3200px',
            height: '568px'
          }
        },
        smallMobile: {
          name: 'Small Mobile',
          styles: {
            width: '360px',
            height: '640px'
          }
        },
        bigMobile: {
          name: 'Big Mobile',
          styles: {
            width: '430px',
            height: '932px'
          }
        },
        smallTablet: {
          name: 'Small Tablet',
          styles: {
            width: '768px',
            height: '1024px'
          }
        },
        bigTablet: {
          name: 'Big Tablet',
          styles: {
            width: '1024px',
            height: '1366px'
          }
        },
        laptop: {
          name: 'Laptop',
          styles: {
            width: '1366px',
            height: '768px'
          }
        },
        desktop: {
          name: 'Desktop Full HD',
          styles: {
            width: '1920px',
            height: '1080px'
          }
        },
        desktop4k: {
          name: 'Desktop 4K',
          styles: {
            width: '3840px',
            height: '2160px'
          }
        }
      }
    },
    options: {
      storySort: {
        order: ['Introduction', 'Components']
      }
    }
  },
  argTypes: {
    class: {
      control: { type: 'text' },
      description: 'Add custom css class'
    },
    style: {
      control: 'text',
      description: 'Add custom css style'
    }
  }
}

export default preview

export const decorators = [withVuetifyTheme]

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'light', title: 'Light', right: '🌞' },
        { value: 'dark', title: 'Dark', right: '🌛' }
      ],
      dynamicTitle: true
    }
  },
  locale: {
    name: 'Locale',
    description: 'Internalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'pl', right: '🇵🇱', title: 'Polish' }
      ]
    }
  }
}
