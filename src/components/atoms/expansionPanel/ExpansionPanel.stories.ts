import type { Meta, StoryObj } from '@storybook/vue3'
import ExpansionPanel from './ExpansionPanel.vue'
import ExpansionPanels from '@/components/atoms/expansionPanels/ExpansionPanels.vue'

/** Use inside the ExpansionPanels.
 */
const meta: Meta<typeof ExpansionPanel> = {
  component: ExpansionPanel,
  tags: ['autodocs'],
  render: (args) => ({
    components: { ExpansionPanel, ExpansionPanels },
    setup() {
      return { args }
    },
    template: `
      <ExpansionPanels>
        <ExpansionPanel v-bind="args" v-if="args?.slots">
          ${args?.title ?? ''}
          ${args?.text ?? ''}
          ${args?.default ?? ''}
        </ExpansionPanel>
        <ExpansionPanel v-bind="args" v-else></ExpansionPanel>
      </ExpansionPanels>
    `
  })
}

export default meta
type Story = StoryObj<typeof ExpansionPanel>

export const DefaultExpansionPanel: Story = {
  args: {
    title: 'Title',
    text: 'Text'
  }
}

export const ExpansionPanelWithSlots = {
  args: {
    title: '<template #title>Title2</template>',
    text: '<template #text>Text2</template>',
    slots: true
  }
}
