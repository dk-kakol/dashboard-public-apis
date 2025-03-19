import type { Meta, StoryObj } from '@storybook/vue3'
import NavigationDrawer from './NavigationDrawer.vue'

const meta: Meta<typeof NavigationDrawer> = {
  component: NavigationDrawer,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof NavigationDrawer>

export const EmptyItemsNavigationDrawer: Story = {
  args: {
    modelValue: true,
    items: []
  }
}

export const DefaultNavigationDrawerWithItems: Story = {
  args: {
    modelValue: true,
    items: [
      { title: 'template.menu.aboutTitle', route: '/eloRoute' },
      { title: 'template.menu.homeTitle', route: '/eloRoute2' }
    ]
  }
}
