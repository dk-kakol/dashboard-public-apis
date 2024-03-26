import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import router from '@/router';
import { createPinia } from 'pinia';
import initDirectives from '@/directives';

setup((app) => {
  app.use(vuetify);
  app.use(i18n);
  app.use(router);
  app.use(createPinia());
  initDirectives(app);
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
