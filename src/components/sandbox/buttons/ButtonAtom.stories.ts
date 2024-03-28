import type { Meta, StoryObj } from '@storybook/vue3';
import ButtonAtom from './ButtonAtom.vue';

const meta: Meta<typeof ButtonAtom> = {
  component: ButtonAtom,
  tags: ['autodocs'],
  render: (args) => ({
    components: { ButtonAtom },
    setup() {
      return { args };
    },
    template: `
    <ButtonAtom v-bind="args">
      <template #test v-if="args.test">${args.test}</template>
    </ButtonAtom>
    `
  })
};

export default meta;
type Story = StoryObj<typeof ButtonAtom>;

export const DefaultButton: Story = {};

export const ButtonWithSlot: Story = {
  args: {
    default: 'test',
    test: `<p class="bg-primary">{{ $t('table.keys.description') }}</p>`
  }
};
