import type { Meta, StoryObj } from '@storybook/vue3'
import ExpansionPanels from './ExpansionPanels.vue'
import ExpansionPanel from '@/components/atoms/expansionPanel/ExpansionPanel.vue'

/** Use ExpansionPanel inside.
 */
const meta: Meta<typeof ExpansionPanels> = {
  component: ExpansionPanels,
  tags: ['autodocs'],
  render: (args) => ({
    components: { ExpansionPanel, ExpansionPanels },
    setup() {
      return { args }
    },
    template: `
      <ExpansionPanels>
        ${args?.default ?? ''}
      </ExpansionPanels>
    `
  })
}

export default meta
type Story = StoryObj<typeof ExpansionPanel>

export const SingleExpansionPanel: Story = {
  args: {
    default: `
      <ExpansionPanel title="First" text="FirstText" />
    `
  }
}

export const MultipleExpansionPanel: Story = {
  args: {
    default: `
      <ExpansionPanel title="First" text="FirstText" />
      <ExpansionPanel title="Second" text="SecondText" />
    `
  }
}
