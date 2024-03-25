// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/js/bootstrap.bundle';

import router from '@/router';
import { themes } from '@storybook/theming';
import { version } from '../package.json';

import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';



const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#fff',
        },
        {
          name: 'dark',
          value: '#444',
        },
        {
          name: 'mod',
          value: '#7CE0D3',
        },
        {
          name: 'salmon',
          value: '#ffbe9f',
        }
      ],
    },
    viewport: {
      viewports: {
        extraSmallMobile: {
          name: 'Extra Small Mobile (not supported)',
          styles: {
            width: '3200px',
            height: '568px',
          }
        },
        smallMobile: {
          name: 'Small Mobile',
          styles: {
            width: '360px',
            height: '640px',
          }
        },
        bigMobile: {
          name: 'Big Mobile',
          styles: {
            width: '430px',
            height: '932px',
          }
        },
        smallTablet: {
          name: 'Small Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          }
        },
        bigTablet: {
          name: 'Big Tablet',
          styles: {
            width: '1024px',
            height: '1366px',
          }
        },
        laptop: {
          name: 'Laptop',
          styles: {
            width: '1366px',
            height: '768px',
          }
        },
        desktop: {
          name: 'Desktop Full HD',
          styles: {
            width: '1920px',
            height: '1080px',
          }
        },
        desktop4k: {
          name: 'Desktop 4K',
          styles: {
            width: '3840px',
            height: '2160px',
          }
        }
      }
    },
    darkMode: {
      dark: { ...themes.dark, brandTitle: `Dashboard Public Apis v.${version}` },
      light: { ...themes.normal, brandTitle: `Dashboard Public Apis v.${version}` }
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    options: {
      storySort: {
        order: ['Introduction', 'Components'],
      },
    }
  },
  argTypes: {
    class: {
      control: { type: 'text' },
      description: 'Add custom css class'
    },
    style: {
      control: { type: 'text' },
      description: 'Add custom css style'
    }
  },
  decorators: [
    (story, { args }) => ({
      components: { story },
      template: `<story class="${args.class}" style="${args.style}" />`,
    }),
  ],
}

setup((app) => {
  app.use(router);
})


export default preview
