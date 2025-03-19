import type { Meta, StoryObj } from '@storybook/vue3'
import RowAtom from '@/components/atoms/row/RowAtom.vue'
import { VContainer } from 'vuetify/lib/components/index.mjs'
import ColAtom from './ColAtom.vue'

const meta: Meta<typeof ColAtom> = {
  component: ColAtom,
  tags: ['autodocs'],
  render: (args) => ({
    components: { RowAtom, VContainer, ColAtom },
    setup() {
      return { args }
    },
    template: `
      <VContainer fluid>
        <RowAtom class="h-screen">
          <ColAtom v-bind="args" class="bg-surface-variant">
            ${args?.default}
          </ColAtom>
        </RowAtom>
      </VContainer>
    `
  })
}

export default meta
type Story = StoryObj<typeof ColAtom>

const slotTemplate = `
  Text of Col Atom
`
/** Use inside the v-container and RowAtom. See: https://vuetifyjs.com/en/components/grids/#usage
 */
export const DefaultColAtom: Story = {
  args: {
    default: slotTemplate
  }
}

export const ExampleColAtom = {
  args: {
    default: slotTemplate,
    'align-self': 'center',
    cols: '2'
  },
  argTypes: {
    'align-self': {
      control: { type: 'select' },
      options: ['auto', 'start', 'end', 'center', 'baseline', 'stretch']
    },
    cols: {
      control: { type: 'select' },
      options: ['auto', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    }
  }
}
