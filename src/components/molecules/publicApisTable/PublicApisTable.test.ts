import PublicApisTable from '@/components/molecules/publicApisTable/PublicApisTable.vue'
import { createWrapper, messages, type VueWrapper } from '@/tests/utils'
import type { Entries } from '@/types'
import { removeOrphans } from '@/helpers'

let wrapper: VueWrapper
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

beforeEach(() => {
  vi.restoreAllMocks()
  wrapper = createWrapper(PublicApisTable, {
    props: {
      apis
    }
  })
})

describe('PublicApisTable', () => {
  it('shoud render properly', () => {
    const table = wrapper.find('[data-test="m-publicApisTable"]')

    expect(table.exists()).toBe(true)
  })

  it('should render all fields header on desktop', () => {
    const header = wrapper.find('[data-test="m-publicApisTable__headTd"]')

    for (const [, value] of Object.entries(messages.en.table.keys)) {
      expect(header.html()).toContain(value)
    }
  })

  it('should render row for each passed apis item', () => {
    const apisRows = wrapper.findAll('[data-test="m-publicApisTable__bodyTr"]')

    expect(apisRows.length).toBe(apis.length)
  })

  it('should render data from apis item (button with href for link prop). All without id!', async () => {
    const apisItem = apis[0]
    await wrapper.setProps({
      apis: [apisItem]
    })
    const itemRow = wrapper.find('[data-test="m-publicApisTable__bodyTr"]')
    const itemLinkButton = wrapper.find('[data-test="m-publicApisTable__apisLinkButton"]')

    for (const [key, value] of Object.entries(apisItem)) {
      if (key === 'id') return
      else if (key === 'Link') {
        expect(itemLinkButton.attributes('href')).toBe(value)
      } else {
        const valueWithoutOrphans = removeOrphans(value.toString())
        expect(itemRow.text()).toContain(valueWithoutOrphans)
      }
    }
  })

  it('should render no results section for empty apis array', async () => {
    await wrapper.setProps({
      apis: []
    })
    const noResults = wrapper.find('[data-test="m-publicApisTable__noResultsSection"]')

    expect(noResults.exists()).toBe(true)
  })
})
