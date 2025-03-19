import { createWrapper, type VueWrapper } from '@/tests/utils'
import FormAutocomplete from '@/components/atoms/autocomplete/AutocompleteAtom.vue'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = createWrapper(FormAutocomplete, {
    props: {
      name: 'formAutocomplete'
    }
  })
})

describe('FormAutocomplete', () => {
  it('renders correctly', () => {
    const autocomplete = wrapper.findComponent({ name: 'v-autocomplete' })

    expect(autocomplete.exists()).toBe(true)
  })

  it('updates v-model correctly', async () => {
    wrapper = createWrapper(FormAutocomplete, {
      props: {
        name: 'formAutocomplete',
        modelValue: 'initial'
      }
    })

    const updatedValue = 'updated'
    await wrapper.setProps({
      modelValue: updatedValue
    })

    const currentComponent = wrapper.getComponent({ name: 'AutocompleteAtom' })

    expect(currentComponent.vm.selectValue).toBe(updatedValue)
  })
})
