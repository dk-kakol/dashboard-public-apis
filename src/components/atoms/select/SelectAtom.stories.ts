import type { Meta, StoryObj } from '@storybook/vue3'
import SelectAtom from './SelectAtom.vue'
import { ref } from 'vue'
import { VListItem } from 'vuetify/lib/components/index.mjs'

/** Wrapper for vuetify v-Select See: https://vuetifyjs.com/en/components/Selects/#usage
 */
const meta: Meta<typeof SelectAtom> = {
  component: SelectAtom,
  tags: ['autodocs'],
  render: (args) => ({
    components: { SelectAtom, VListItem },
    setup() {
      const modelValue = ref<string>(args.modelValue ?? '')

      return { args, modelValue }
    },
    template: `
      <SelectAtom
        v-bind="args"
        v-model="modelValue">
        ${args.item}
        ${args.selection}
      </SelectAtom>
    `
  })
}

export default meta
type Story = StoryObj<typeof SelectAtom>

export const DefaultSelect: Story = {}

export const SelectWithOptions = {
  args: {
    items: ['one', 'two', 'three']
  }
}

export const SelectWithObjectOptions = {
  args: {
    items: [
      { id: 1, name: 'one' },
      { id: 2, name: 'two' }
    ],
    'item-title': 'name',
    'item-value': 'id'
  }
}

export const SelectWithOptionsAndSlots = {
  args: {
    items: ['one', 'two', 'three'],
    item: `
      <template v-slot:item="{ props: itemProps }">
        <v-list-item v-bind="itemProps">
          <template #title="{ title }">
            <p class="font-italic">{{ title }}</p>
          </template>
        </v-list-item>
      </template>`,
    selection: `
      <template #selection="{ item: selectionItem }" v-if="args.selection">
        <p class="font-italic">{{ selectionItem.title }}</p>
      </template>`
  }
}
