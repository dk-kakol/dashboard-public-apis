import type { Meta, StoryObj } from '@storybook/vue3'
import ButtonAtom from './ButtonAtom.vue'

const meta: Meta<typeof ButtonAtom> = {
  component: ButtonAtom,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ButtonAtom>

export const DefaultButton: Story = {}

export const ButtonWithSlot: Story = {
  args: {
    default: 'test'
  }
}

export const ElevateAndComfortableButton: Story = {
  args: {
    variant: 'elevated',
    default: 'test',
    density: 'comfortable'
  }
}
