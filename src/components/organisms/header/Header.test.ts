import { mount } from '@vue/test-utils';
import i18n, { messages } from '@/plugins/i18n';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import Header from '@/components/organisms/header/Header.vue';


const vuetify = createVuetify({
  components,
  directives,
})



global.ResizeObserver = require('resize-observer-polyfill');

describe('Header Organism', () => {
  it('should render header title properly', () => {
    const wrapper = mount({
      template: '<v-layout><Header></Header></v-layout>'
    }, {
      global: {
        components: {
          Header,
        },
        plugins: [vuetify, i18n],
        // mocks: {
        //   $t: (msg: string) => msg,
        //   $i18n: () => { availableLocales: ['pl', 'en'] },
        // }
      }
    });

    const headerTitleText = wrapper.get('[class="v-toolbar-title__placeholder"]').text();

    expect(headerTitleText).toBe(messages.pl.template.header.title);
  });

  it('should render buttons for all available locales', () => {
    const wrapper = mount({
      template: '<v-layout><Header></Header></v-layout>'
    }, {
      global: {
        components: {
          Header,
        },
        plugins: [vuetify, i18n],
      }
    });

    const headerLocaleButtons= wrapper.findAll('[data-test="o-header__localeButton"]');

    expect(headerLocaleButtons).toHaveLength(i18n.global.availableLocales?.length);
  });
})

it('should open NavigationDrawer when Menu Button Clicked', async () => {
  const wrapper = mount({
    template: '<v-layout><Header></Header></v-layout>'
  }, {
    global: {
      components: {
        Header,
      },
      plugins: [vuetify, i18n],
    }
  });

  const headerMenuButton = wrapper.get('[data-test="o-header__menuButton"]');
  await headerMenuButton.trigger('click');
  const headerNavigationDrawer = wrapper.get('[data-test="o-header__navigationDrawer"]');

  expect(headerNavigationDrawer.classes()).toContain('v-navigation-drawer--active');
});