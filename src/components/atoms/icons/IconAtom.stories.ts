import type { Meta, StoryObj } from '@storybook/vue3'
import IconAtom from './IconAtom.vue'

/** Wrapper for VIcon, see: https://vuetifyjs.com/en/components/icons/#usage
 */
const meta: Meta<typeof IconAtom> = {
  component: IconAtom,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['large', 'small']
    }
  }
}

export default meta
type Story = StoryObj<typeof IconAtom>

export const ExampleIcon: Story = {
  args: {
    icon: 'mdi-open-in-new',
    size: 'large'
  }
}
