import type { Meta, StoryObj } from '@storybook/vue3'
import PublicApisFilters from './PublicApisFilters.vue'

const meta: Meta<typeof PublicApisFilters> = {
  component: PublicApisFilters,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof PublicApisFilters>

export const DefaultPublicApisFilters: Story = {}
