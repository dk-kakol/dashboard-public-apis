import {
  createWrapper,
  flushPromises,
  nextTick,
  type VueWrapper,
  type DefineComponent
} from '@/tests/utils'
import HomeView from '@/components/pages/home/HomeView.vue'
import { useApisStore } from '@/stores'

let wrapper: VueWrapper
let currentComponent: Omit<VueWrapper<typeof HomeView>, 'exists'>

beforeEach(async () => {
  /**
   * stubActions:
   * When set to false, actions are only spied, but they will still get executed.
   * When set to true, actions will be replaced with spies, resulting in their code not being executed.
   * Defaults to true.
   */
  wrapper = createWrapper(HomeView, undefined, { stubActions: false })
  await flushPromises()
  await nextTick()
  currentComponent = wrapper.getComponent({ name: 'HomeView' })
})

describe('Home View', () => {
  it('should render properly and have Default Template', () => {
    const defaultTemplate = wrapper.find('[data-test="p-homeView__defaultTemplate"]')

    expect(defaultTemplate.exists()).toBe(true)
  })

  it('should have defined currentPage, apis, pagesCount and loading from apis store', () => {
    expect(currentComponent.vm.currentPage).toBeDefined()
    expect(currentComponent.vm.apis).toBeDefined()
    expect(currentComponent.vm.pagesCount).toBeDefined()
    expect(currentComponent.vm.loading).toBeDefined()
  })

  it('should render Public Apis List with apis, loading, pages count and current page props', () => {
    const publicApisList = wrapper.getComponent({ name: 'PublicApisList' })

    expect(publicApisList.props('currentPage')).toBe(currentComponent.vm.currentPage)
    expect(publicApisList.props('apis')).toEqual(currentComponent.vm.apis)
    expect(publicApisList.props('pagesCount')).toBe(currentComponent.vm.pagesCount)
    expect(publicApisList.props('loading')).toBe(currentComponent.vm.loading)
  })

  it('should call fetchApis action initially', () => {
    const apisStore = useApisStore()

    expect(apisStore.fetchApis).toHaveBeenCalledOnce()
  })

  it('should call fetchApis action on users page change', async () => {
    const apisStore = useApisStore()
    currentComponent.vm.apisStore.entriesPerPage = 1
    await nextTick()

    const secondPageButton = currentComponent
      .find('[data-test="o-publicApisList__pagination"]')
      .find('[aria-label="Go to page 2"]')
    await secondPageButton.trigger('click')

    expect(apisStore.fetchApis).toHaveBeenCalledTimes(2)
  })

  it('should call fetchApis (with correct params) on users filtering', async () => {
    const apisStore = useApisStore()

    const publicApisList = wrapper.getComponent<DefineComponent>({ name: 'PublicApisList' })
    publicApisList.vm.$emit('filter')
    await flushPromises()

    // first call initially and second after filter event income
    expect(apisStore.fetchApis).toHaveBeenCalledTimes(2)
  })

  it('should display error and dont send request on invalid filters', async () => {
    const apisStore = useApisStore()

    // open filters
    const filterExpansionPanelButton = wrapper
      .find('[data-test="o-publicApisList__filters"]')
      .find('button')
    await filterExpansionPanelButton.trigger('click')

    // set invalid value in search field
    const testValue = 'Invalid Input with special character <'
    await wrapper
      .find('[data-test="o-publicApisFilters__search"]')
      .find('input')
      .setValue(testValue)
    await flushPromises()

    // emit filter
    const publicApisList = wrapper.getComponent<DefineComponent>({ name: 'PublicApisList' })
    publicApisList.vm.$emit('filter')
    await flushPromises()

    // fetch apis call only initially before filter event occured
    expect(apisStore.fetchApis).toHaveBeenCalledTimes(1)
  })
})
