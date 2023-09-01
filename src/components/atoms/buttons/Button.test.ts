import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import Button from '@/components/atoms/buttons/Button.vue';


const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill');

describe('Button Atom', () => {
  it('should render properly', () => {
    const wrapper = mount(Button, {
      global: {
        plugins: [vuetify],
      }
    });

    const button = wrapper.find('[type="button"]');
    expect(button.exists()).toBe(true);
  });
})