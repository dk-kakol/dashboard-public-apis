import type { Meta, StoryObj } from '@storybook/vue3'
import HeaderOrganism from './HeaderOrganism.vue'

const meta: Meta<typeof HeaderOrganism> = {
  component: HeaderOrganism,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof HeaderOrganism>

export const DefaultHeaderOrganism: Story = {}
