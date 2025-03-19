import type { Meta, StoryObj } from '@storybook/vue3'
import LoaderAtom from './LoaderAtom.vue'
import ButtonAtom from '@/components/atoms/buttons/ButtonAtom.vue'
import { ref } from 'vue'

/**
 * Loader Atom is initially in non loading state
 * A skeleton loader is considered to be in a loading state if one of the following conditions are met:
 * 1. The default slot is not used
 * 2. The loading property is set to true
 */
const meta: Meta<typeof LoaderAtom> = {
  component: LoaderAtom,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'Array of type LoaderType'
    }
  },
  render: (args) => ({
    components: { LoaderAtom, ButtonAtom },
    setup() {
      const loading = ref<boolean>(args.loading ?? false)
      const toggleLoading = () => (loading.value = !loading.value)

      return { args, toggleLoading, loading }
    },
    template: `
    <ButtonAtom @click="toggleLoading()">Toggle Loading</ButtonAtom>
    <LoaderAtom :loading="loading" :type="args.type">
      <template #default v-if="args.default">${args.default}</template>
    </LoaderAtom>
    `
  })
}

export default meta
type Story = StoryObj<typeof LoaderAtom>

export const DefaultLoader: Story = {}

export const LoaderEnabled: Story = {
  args: {
    loading: true
  }
}

export const LoaderText: Story = {
  args: {
    loading: true,
    type: ['text']
  }
}

export const ComplexLoader: Story = {
  args: {
    loading: true,
    type: ['text', 'text', 'card']
  }
}

export const LoaderWithSlot: Story = {
  args: {
    type: ['text'],
    default: '<p>Loaded Text</p>'
  }
}
