import type { Meta, StoryObj } from '@storybook/vue3'
import FormAutocomplete from './FormAutocomplete.vue'
import { VListItem } from 'vuetify/lib/components/index.mjs'
import { ref } from 'vue'

/** Wrapper for vuetify v-autocomplete See: https://vuetifyjs.com/en/components/autocompletes/#usage
 */
const meta: Meta<typeof FormAutocomplete> = {
  component: FormAutocomplete,
  tags: ['autodocs'],
  render: (args) => ({
    components: { FormAutocomplete, VListItem },
    setup() {
      const modelValue = ref<string>(args.modelValue ?? '')

      return { args, modelValue }
    },
    template: `
      <FormAutocomplete
        v-bind="args"
        v-model="modelValue">
        ${args.item}
        ${args.selection}
      </FormAutocomplete>
    `
  })
}

export default meta
type Story = StoryObj<typeof FormAutocomplete>

export const DefaultAutocomplete: Story = {
  args: {
    name: 'formAutocomple'
  }
}

export const AutocompleteWithOptions = {
  args: {
    name: 'formAutocomplete',
    items: ['one', 'two', 'three']
  }
}

export const AutocompleteWithObjectOptions = {
  args: {
    name: 'formAutocomplete',
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
    name: 'formAutocomplete',
    items: ['one', 'two', 'three'],
    rules: 'required',
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
