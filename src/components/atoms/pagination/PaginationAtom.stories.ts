import type { Meta, StoryObj } from '@storybook/vue3'
import PaginationAtom from './PaginationAtom.vue'
import { ref } from 'vue'

const meta: Meta<typeof PaginationAtom> = {
  component: PaginationAtom,
  tags: ['autodocs'],
  render: (args) => ({
    components: { PaginationAtom },
    setup() {
      const currentPage = ref<number>(args.modelValue ?? 1)

      return { args, currentPage }
    },
    template: `
    <PaginationAtom
      v-bind="args"
      v-model="currentPage"></PaginationAtom>
    `
  })
}

export default meta
type Story = StoryObj<typeof PaginationAtom>

export const DefaultPagination: Story = {}

export const PaginationWithArgs: Story = {
  args: {
    disabled: false,
    length: 3,
    totalVisible: 3
  }
}

export const PaginationWithLargeAmountOfPages: Story = {
  args: {
    disabled: false,
    length: 100,
    totalVisible: 6,
    modelValue: 7
  }
}
