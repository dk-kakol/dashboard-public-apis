import type { Meta, StoryObj } from '@storybook/vue3'
import FormSelect from './FormSelect.vue'
import { ref } from 'vue'
import { VListItem } from 'vuetify/lib/components/index.mjs'

/** Wrapper for vuetify v-Select See: https://vuetifyjs.com/en/components/Selects/#usage
 */
const meta: Meta<typeof FormSelect> = {
  component: FormSelect,
  tags: ['autodocs'],
  render: (args) => ({
    components: { FormSelect, VListItem },
    setup() {
      const modelValue = ref<string>(args.modelValue ?? '')

      return { args, modelValue }
    },
    template: `
      <FormSelect
        v-bind="args"
        v-model="modelValue">
        ${args.item}
        ${args.selection}
      </FormSelect>
    `
  })
}

export default meta
type Story = StoryObj<typeof FormSelect>

export const DefaultSelect: Story = {
  args: {
    name: 'formSelect'
  }
}

export const SelectWithOptions = {
  args: {
    name: 'formSelect',
    items: ['one', 'two', 'three']
  }
}

export const SelectWithObjectOptions = {
  args: {
    name: 'formSelect',
    items: [
      { id: 1, name: 'one' },
      { id: 2, name: 'two' }
    ],
    'item-title': 'name',
    'item-value': 'id'
  }
}

export const SelectWithOptionsSlotsRulesAndInitialValue = {
  args: {
    name: 'formSelect',
    items: ['one', 'two', 'three'],
    rules: 'required',
    modelValue: 'two',
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
