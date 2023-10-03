import Button from '@/components/atoms/buttons/Button.vue';
import createWrapper from '@/tests/utils/createWrapper';

describe('Button Atom', () => {
  it('should render properly', () => {
    const wrapper = createWrapper(Button);
    const button = wrapper.find('[type="button"]');

    expect(button.exists()).toBe(true);
  });

  it('should emmit click event properly', () => {
    const wrapper = createWrapper(Button);

    const button = wrapper.find('[type="button"]');
    button.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });

  it('should set density property on vuetify button component from incoming props', async () => {
    const wrapper = createWrapper(Button, {
      props: {
        density: "comfortable",
      },
    });

    const button = wrapper.findComponent({ name: 'v-btn' });
    // await wrapper.setProps({ density: 'default' });

    expect(button.classes()).toContain('v-btn--density-comfortable');
  });

  it('should set density to "compact" on vuetify button component when props undefined', () => {
    const wrapper = createWrapper(Button);

    const button = wrapper.findComponent({ name: 'v-btn' });

    expect(button.classes()).toContain('v-btn--density-compact');
  });

  it('should render passed template in slot', () => {
    const slotText = 'ButtonText';
    const wrapper = createWrapper(Button, {
      slots: {
        default: slotText,
      },
    });

    const button = wrapper.findComponent({ name: 'v-btn' });

    expect(button.text()).toContain(slotText);
  });
})