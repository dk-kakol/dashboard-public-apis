import { createWrapper, messages, flushPromises, type VueWrapper } from '@/tests/utils'
import PublicApisFilters from '@/components/organisms/publicApisFilters/PublicApisFilters.vue'
import FormTextField from '@/components/molecules/formTextField/FormTextField.vue'
import { useApisFiltersStore, useApisStore } from '@/stores'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = createWrapper(PublicApisFilters)
})

describe('PublicApisFilters', () => {
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders title in expansion panel', () => {
    expect(wrapper.text()).toContain(messages.en.filters.api.title)
  })

  it('render filter section in text slot of opened expansion panel', async () => {
    const filterExpansionPanelButton = wrapper
      .find('[data-test="o-publicApisFilters__expansionPanel"]')
      .find('button')
    await filterExpansionPanelButton.trigger('click')

    const filters = wrapper.find('[data-test="o-publicApisFilters__filters"]')
    expect(filters.exists()).toBe(true)
  })

  it('renders all filters correctly', async () => {
    const expectedFilters = ['search', 'category', 'auth', 'cors']

    const filterExpansionPanelButton = wrapper
      .find('[data-test="o-publicApisFilters__expansionPanel"]')
      .find('button')
    await filterExpansionPanelButton.trigger('click')

    expectedFilters.forEach((name) => {
      const component = wrapper.findComponent(`[data-test="o-publicApisFilters__${name}"]`)
      expect(component.exists()).toBe(true)
    })
  })

  it('updates v-model correctly for FormTextField', async () => {
    const filterExpansionPanelButton = wrapper
      .find('[data-test="o-publicApisFilters__expansionPanel"]')
      .find('button')
    await filterExpansionPanelButton.trigger('click')

    const input = wrapper.findComponent(FormTextField).find('input')
    await input.setValue('test input')

    const currentComponent = wrapper.getComponent({ name: 'PublicApisFilters' })
    expect(currentComponent.vm.getApisFilters.search).toBe('test input')
  })

  it('updates v-model correctly for FormAutocomplete', async () => {
    const filterExpansionPanelButton = wrapper
      .find('[data-test="o-publicApisFilters__expansionPanel"]')
      .find('button')
    await filterExpansionPanelButton.trigger('click')

    const field = wrapper.getComponent({ name: 'AutocompleteAtom' })
    field.vm.selectValue = 'updated'

    const currentComponent = wrapper.getComponent({ name: 'PublicApisFilters' })
    expect(currentComponent.vm.getApisFilters.category).toBe('updated')
  })

  it('updates v-model correctly for FormSelect (cors)', async () => {
    const filterExpansionPanelButton = wrapper
      .find('[data-test="o-publicApisFilters__expansionPanel"]')
      .find('button')
    await filterExpansionPanelButton.trigger('click')

    const field = wrapper
      .get('[data-test="o-publicApisFilters__cors"]')
      .getComponent({ name: 'SelectAtom' })
    field.vm.selectValue = 'updated'

    const currentComponent = wrapper.getComponent({ name: 'PublicApisFilters' })
    expect(currentComponent.vm.getApisFilters.cors).toBe('updated')
  })

  it('calls onFilter when filter button is clicked', async () => {
    const filterExpansionPanelButton = wrapper
      .find('[data-test="o-publicApisFilters__expansionPanel"]')
      .find('button')
    await filterExpansionPanelButton.trigger('click')

    await wrapper.find('[data-test="o-publicApisFilters__filterButton"]').trigger('click')

    const currentComponent = wrapper.getComponent({ name: 'PublicApisFilters' })
    expect(currentComponent.emitted('filter')).toBeTruthy()
  })

  it('calls onReset actions when reset button is clicked', async () => {
    const filterExpansionPanelButton = wrapper
      .find('[data-test="o-publicApisFilters__expansionPanel"]')
      .find('button')
    await filterExpansionPanelButton.trigger('click')

    await wrapper.find('[data-test="o-publicApisFilters__resetButton"]').trigger('click')
    await flushPromises()

    const apisStore = useApisStore()
    const apisFiltersStore = useApisFiltersStore()

    expect(apisStore.fetchApis).toHaveBeenCalledOnce()
    expect(apisFiltersStore.resetApisFilters).toHaveBeenCalledOnce()
  })
})
