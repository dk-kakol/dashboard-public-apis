import type { Meta, StoryObj } from '@storybook/vue3'
import PublicApisList from './PublicApisList.vue'
import { ref } from 'vue'

import type { Entries } from '@/types'

const apis: Entries = [
  {
    id: 'firstid',
    API: 'AdoptAPet',
    Description: 'Resource to help get pets adopted',
    Auth: 'apiKey',
    HTTPS: true,
    Cors: 'yes',
    Link: 'https://www.adoptapet.com/public/apis/pet_list.html',
    Category: 'Animals'
  },
  {
    id: 'secondid',
    API: 'Axolotl',
    Description: 'Collection of axolotl pictures and facts',
    Auth: '',
    HTTPS: true,
    Cors: 'no',
    Link: 'https://theaxolotlapi.netlify.app/',
    Category: 'Animals'
  }
]

/**
 This is the list with loader, filters, pagination and table for public apis entries info.
 It only receive data for displaying and emits users actions.
 Fetching data and other logic should be done by parent component.
 */
const meta: Meta<typeof PublicApisList> = {
  component: PublicApisList,
  tags: ['autodocs'],
  // add argTypes: {}
  render: (args) => ({
    components: { PublicApisList },
    setup() {
      const currentPage = ref<number>(1)

      return { args, currentPage }
    },
    template: `
    <PublicApisList
      v-bind="args"
      v-model:currentPage="currentPage">
    </PublicApisList>
    `
  }),
  args: {
    apis,
    loading: false,
    pagesCount: 5
  }
}

export default meta
type Story = StoryObj<typeof PublicApisList>

export const ApisList: Story = {}

export const NoApisList: Story = {
  args: {
    apis: []
  }
}

export const LoadingApisList: Story = {
  args: {
    loading: true
  }
}

const longApisEntries: Entries = []
Array(10)
  .fill('1')
  .forEach(() => longApisEntries.push(...apis))
export const LongApisList: Story = {
  args: {
    apis: longApisEntries
  }
}
