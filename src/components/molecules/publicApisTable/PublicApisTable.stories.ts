import type { Meta, StoryObj } from '@storybook/vue3'
import PublicApisTable from './PublicApisTable.vue'

import type { Entries } from "@/types";

const apis: Entries = [
  {
    "API": "AdoptAPet",
    "Description": "Resource to help get pets adopted",
    "Auth": "apiKey",
    "HTTPS": true,
    "Cors": "yes",
    "Link": "https://www.adoptapet.com/public/apis/pet_list.html",
    "Category": "Animals"
  },
  {
    "API": "Axolotl",
    "Description": "Collection of axolotl pictures and facts",
    "Auth": "",
    "HTTPS": true,
    "Cors": "no",
    "Link": "https://theaxolotlapi.netlify.app/",
    "Category": "Animals"
  }
];

/**
 Add component description
 */
const meta: Meta<typeof PublicApisTable> = {
  component: PublicApisTable,
  tags: ['autodocs'],
  // add argTypes: {}
  args: {
    apis,
  }
}

export default meta
type Story = StoryObj<typeof PublicApisTable>

export const ApisTable: Story = {};

export const NoApisTable: Story = {
  args: {
    apis: []
  }
}