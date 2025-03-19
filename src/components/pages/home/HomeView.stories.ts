import type { Meta, StoryObj } from '@storybook/vue3'
import HomeView from './HomeView.vue'

const meta: Meta<typeof HomeView> = {
  component: HomeView,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof HomeView>

export const ApisTable: Story = {}
