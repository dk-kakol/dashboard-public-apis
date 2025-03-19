import { createWrapper, type VueWrapper } from '@/tests/utils'
import AutocompleteAtom from '@/components/atoms/autocomplete/AutocompleteAtom.vue'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = createWrapper(AutocompleteAtom)
})

describe('AutocompleteAtom', () => {
  it('renders correctly', () => {
    const autocomplete = wrapper.findComponent({ name: 'v-autocomplete' })

    expect(autocomplete.exists()).toBe(true)
  })

  it('updates v-model correctly', async () => {
    wrapper = createWrapper(AutocompleteAtom, {
      props: {
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
