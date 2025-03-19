import type { Meta, StoryObj } from '@storybook/vue3'
import AutocompleteAtom from './AutocompleteAtom.vue'
import { VListItem } from 'vuetify/lib/components/index.mjs'
import { ref } from 'vue'

/** Wrapper for vuetify v-autocomplete See: https://vuetifyjs.com/en/components/autocompletes/#usage
 */
const meta: Meta<typeof AutocompleteAtom> = {
  component: AutocompleteAtom,
  tags: ['autodocs'],
  render: (args) => ({
    components: { AutocompleteAtom, VListItem },
    setup() {
      const modelValue = ref<string>(args.modelValue ?? '')

      return { args, modelValue }
    },
    template: `
      <AutocompleteAtom
        v-bind="args"
        v-model="modelValue">
        ${args.item}
        ${args.selection}
      </AutocompleteAtom>
    `
  })
}

export default meta
type Story = StoryObj<typeof AutocompleteAtom>

export const DefaultAutocomplete: Story = {}

export const AutocompleteWithOptions = {
  args: {
    items: ['one', 'two', 'three']
  }
}

export const AutocompleteWithObjectOptions = {
  args: {
    items: [
      { id: 1, name: 'one' },
      { id: 2, name: 'two' }
    ],
    'item-title': 'name',
    'item-value': 'id'
  }
}

export const AutocompleteWithOptionsAndSlots = {
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
