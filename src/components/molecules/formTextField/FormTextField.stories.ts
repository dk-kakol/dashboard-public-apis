import type { Meta, StoryObj } from '@storybook/vue3'
import FormTextField from './FormTextField.vue'
import { ref } from 'vue'
import { z } from '@/plugins/zod'
import { toTypedSchema } from '@vee-validate/zod'

const meta: Meta<typeof FormTextField> = {
  component: FormTextField,
  tags: ['autodocs'],
  render: (args) => ({
    components: { FormTextField },
    setup() {
      const modelValue = ref<string>(args.modelValue ?? '')
      return { args, modelValue }
    },
    template: `
      <FormTextField v-bind="args" v-model="modelValue">
        ${args?.append ?? ''}
      </FormTextField>
    `
  })
}

export default meta
type Story = StoryObj<typeof FormTextField>

export const DefaultFormTextField: Story = {
  args: {
    name: 'textField'
  }
}

export const FormTextFieldWithLabelAndAppendSlot = {
  args: {
    name: 'textField',
    label: 'Test label',
    append: '<template #append>Append</template>'
  }
}

export const FormTextFieldWithErrorValue = {
  args: {
    name: 'textField',
    label: 'Test label',
    'error-messages': 'Invalid',
    modelValue: '<'
  }
}

export const FormTextFieldWithVeeValidateRules = {
  args: {
    name: 'textField',
    label: 'Test label',
    rules: 'required'
  }
}

export const FormTextFieldWithZodRules = {
  args: {
    name: 'textField',
    label: 'Test label',
    rules: toTypedSchema(z.string().excludeSpecialRefine().nullish())
  }
}
