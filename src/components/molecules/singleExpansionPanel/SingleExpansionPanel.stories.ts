import type { Meta, StoryObj } from '@storybook/vue3'
import SingleExpansionPanel from './SingleExpansionPanel.vue'

const meta: Meta<typeof SingleExpansionPanel> = {
  component: SingleExpansionPanel,
  tags: ['autodocs'],
  render: (args) => ({
    components: { SingleExpansionPanel },
    setup() {
      return { args }
    },
    template: `
      <SingleExpansionPanel v-bind="args" v-if="args?.slots">
        ${args?.title ?? ''}
        ${args?.text ?? ''}
        ${args?.default ?? ''}
      </SingleExpansionPanel>
      <SingleExpansionPanel v-bind="args" v-else></SingleExpansionPanel>
    `
  })
}

export default meta
type Story = StoryObj<typeof SingleExpansionPanel>

export const DefaultSingleExpansionPanel: Story = {
  args: {
    title: 'Title',
    text: 'Text'
  }
}

export const SingleExpansionPanelWithSlots = {
  args: {
    title: '<template #title>Title2</template>',
    text: '<template #text>Text2</template>',
    slots: true
  }
}
