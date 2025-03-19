import PublicApisList from '@/components/organisms/publicApisList/PublicApisList.vue'
import PaginationAtom from '@/components/atoms/pagination/PaginationAtom.vue'
import { createWrapper, type VueWrapper } from '@/tests/utils'
import type { Entries } from '@/types'

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
const pagesCount = 5
beforeEach(() => {
  wrapper = createWrapper(PublicApisList, {
    props: {
      apis,
      loading: false,
      pagesCount
    }
  })
})
describe('PublicApisList', () => {
  it('should render filter section', () => {
    const filters = wrapper.find('[data-test="o-publicApisList__filters"]')

    expect(filters.exists()).toBe(true)
  })

  it('should emit filter event, when user click filter button', async () => {
    const filters = wrapper.getComponent<typeof PaginationAtom>(
      '[data-test="o-publicApisList__filters"]'
    )
    filters.vm.$emit('filter')
    const publicApisList = wrapper.findComponent({ name: 'PublicApisList' })
    expect(publicApisList.emitted('filter')).toBeTruthy()
  })

  it('shoud render table for public apis items when loading is false', () => {
    const table = wrapper.find('[data-test="o-publicApisList__table"]')

    expect(table.exists()).toBe(true)
  })

  it('should render pagination if apis list is not empty and loading is false', () => {
    const pagination = wrapper.find('[data-test="o-publicApisList__pagination"]')

    expect(pagination.exists()).toBe(true)
  })

  it('should not render pagination if apis list is empty', async () => {
    await wrapper.setProps({
      apis: []
    })

    const pagination = wrapper.find('[data-test="o-publicApisList__pagination"]')

    expect(pagination.exists()).toBe(false)
  })

  it('should render loader of text type when loading prop with true value is passed', async () => {
    await wrapper.setProps({
      loading: true
    })

    const loader = wrapper
      .find('[data-test="o-publicApisList__loader"]')
      .find('.v-skeleton-loader__text')

    expect(loader.exists()).toBe(true)
  })

  it('should not render pagination and table when loading prop with true value is passed', async () => {
    await wrapper.setProps({
      loading: true
    })

    const pagination = wrapper.find('[data-test="o-publicApisList__pagination"]')
    const table = wrapper.find('[data-test="o-publicApisList__table"]')

    expect(pagination.exists()).toBe(false)
    expect(table.exists()).toBe(false)
  })

  it('should emit update:currentPage event when user change pagination page', async () => {
    const currentComponent = wrapper.getComponent({ name: 'PublicApisList' })
    const secondPageButton = wrapper
      .find('[data-test="o-publicApisList__pagination"]')
      .find('[aria-label="Go to page 2"]')

    await secondPageButton.trigger('click')

    expect(currentComponent.emitted()).toHaveProperty('update:currentPage')
    expect(currentComponent.emitted('update:currentPage')?.[0]).toEqual([2])
  })

  it('should pass pagesCount prop to pagination component', () => {
    const pagination = wrapper.getComponent<typeof PaginationAtom>(
      '[data-test="o-publicApisList__pagination"]'
    )

    expect(pagination.props('length')).toBe(pagesCount)
  })
})
