import type { Meta, StoryObj } from '@storybook/vue3'
import RowAtom from './RowAtom.vue'
import { VContainer } from 'vuetify/lib/components/index.mjs'
import ColAtom from '@/components/atoms/col/ColAtom.vue'

const meta: Meta<typeof RowAtom> = {
  component: RowAtom,
  tags: ['autodocs'],
  render: (args) => ({
    components: { RowAtom, VContainer, ColAtom },
    setup() {
      return { args }
    },
    template: `
      <VContainer fluid>
        <RowAtom
          v-bind="args">
          ${args?.default}
        </RowAtom>
      </VContainer>
    `
  })
}

export default meta
type Story = StoryObj<typeof RowAtom>

const slotTemplate = `
  <ColAtom cols="3" class="bg-surface-variant">One of two columns</ColAtom>
  <ColAtom cols="3" class="bg-surface-variant">One of two columns</ColAtom>
`
/** Use inside the v-container. Add ColsAtom inside. See: https://vuetifyjs.com/en/components/grids/#usage
 */
export const DefaultRowAtom: Story = {
  args: {
    default: slotTemplate
  }
}

export const ExampleRowAtom = {
  args: {
    default: slotTemplate,
    align: 'center',
    justify: 'space-between',
    'no-gutters': false
  },
  argTypes: {
    align: {
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'baseline', 'stretch']
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'space-between', 'space-around', 'space-evenly']
    },
    'no-gutters': {
      control: { type: 'boolean' }
    }
  }
}
