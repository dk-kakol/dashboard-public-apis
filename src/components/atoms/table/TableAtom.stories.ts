import type { Meta, StoryObj } from '@storybook/vue3'
import TableAtom from './TableAtom.vue'

/** Wrapper for VTable, see: https://vuetifyjs.com/en/components/tables/#usage
 */
const meta: Meta<typeof TableAtom> = {
  component: TableAtom,
  tags: ['autodocs'],
  render: (args) => ({
    components: { TableAtom },
    setup() {
      return { args }
    },
    template: `
      <TableAtom v-bind="args">
        ${args.default}
      </TableAtom>
    `
  })
}

export default meta
type Story = StoryObj<typeof TableAtom>

const defaultSlot = `
<thead>
  <tr>
    <th class="text-left">
      Name
    </th>
    <th class="text-left">
      Calories
    </th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Frozen Yogurt</td>
    <td>159</td>
  </tr>
  <tr>
    <td>Ice cream sandwich</td>
    <td>237</td>
  </tr>
</tbody>
`

export const ExampleTable: Story = {
  args: {
    default: defaultSlot
  }
}

export const ExampleTableWithTheme = {
  args: {
    default: defaultSlot,
    theme: 'dark',
    density: 'compact'
  },
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['dark', 'light']
    },
    density: {
      control: { type: 'select' },
      options: ['default', 'comfortable', 'compact']
    }
  }
}
