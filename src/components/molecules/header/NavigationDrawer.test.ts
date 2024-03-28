import NavigationDrawer from './NavigationDrawer.vue';
import { createWrapper, type VueWrapper, type DefineComponent } from '@/tests/utils';

let wrapper: VueWrapper;

beforeAll(() => {
  wrapper = createWrapper(NavigationDrawer, {
    props: {
      value: true,
      items: [
        { title: 'template.menu.aboutTitle', route: '/eloRoute' },
        { title: 'template.menu.homeTitle', route: '/eloRoute2' }
      ]
    }
  });
});

describe('NavigationDrawer', () => {
  it('should render all passed linked items', () => {
    const renderedListItems = wrapper.findAll('[data-test="m-navigationDrawer__listItem"]');

    expect(renderedListItems.length).toBe(2);
  });

  it('list items should have apropiete to atributes', () => {
    const renderedListItems = wrapper.findAllComponents<DefineComponent>(
      '[data-test="m-navigationDrawer__listItem"]'
    );

    expect(renderedListItems[0].props('to')).toBe('/eloRoute');
    expect(renderedListItems[1].props('to')).toBe('/eloRoute2');
  });
});
