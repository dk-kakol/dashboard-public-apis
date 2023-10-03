import { createWrapper, i18n, messages, type VueWrapper } from '@/tests/utils';
import Header from '@/components/organisms/header/Header.vue';

let wrapper: VueWrapper;

beforeAll(() => {
  wrapper = createWrapper(Header, {
    global: {
      mocks: {
        $t: (msg: string) => msg,
        $i18n: { availableLocales: ['pl', 'en'] },
      }
    }
  });
})

describe('Header Organism', () => {
  it('should render header title properly', () => {
    const headerTitleText = wrapper.get('[class="v-toolbar-title__placeholder"]').text();

    expect(headerTitleText).toBe('template.header.title');

    // if mocks above commented, component is using i18n plugin, and you can check exact message:
    // expect(headerTitleText).toBe(messages.pl.template.header.title);
  });

  it('should render buttons for all available locales', () => {
    const headerLocaleButtons= wrapper.findAll('[data-test="o-header__localeButton"]');

    expect(headerLocaleButtons).toHaveLength(i18n.global.availableLocales?.length);
  });

  it('should open NavigationDrawer when Menu Button Clicked', async () => {
    const headerMenuButton = wrapper.get('[data-test="o-header__menuButton"]');
    await headerMenuButton.trigger('click');
    const headerNavigationDrawer = wrapper.get('[data-test="o-header__navigationDrawer"]');
  
    expect(headerNavigationDrawer.classes()).toContain('v-navigation-drawer--active');
  });
})
