import type { Meta, StoryObj } from '@storybook/vue3'
import TextFieldAtom from './TextFieldAtom.vue'
import { ref } from 'vue'

const meta: Meta<typeof TextFieldAtom> = {
  component: TextFieldAtom,
  tags: ['autodocs'],
  render: (args) => ({
    components: { TextFieldAtom },
    setup() {
      const modelValue = ref<string>(args.modelValue ?? '')
      return { args, modelValue }
    },
    template: `
      <TextFieldAtom v-bind="args" v-model="modelValue">
      ${args?.append ?? ''}
      </TextFieldAtom>
    `
  })
}

export default meta
type Story = StoryObj<typeof TextFieldAtom>

export const DefaultTextFieldAtom: Story = {}

export const TextFieldAtomWithLabelAndAppendSlot = {
  args: {
    label: 'Test label',
    append: '<template #append>Append</template>'
  }
}

export const TextFieldAtomWithErrorValue = {
  args: {
    label: 'Test label',
    'error-messages': 'Invalid',
    modelValue: '<'
  }
}
