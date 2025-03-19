import { createWrapper, type VueWrapper } from '@/tests/utils'
import SelectAtom from '@/components/atoms/select/SelectAtom.vue'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = createWrapper(SelectAtom)
})

describe('SelectAtom', () => {
  it('renders correctly', () => {
    const autocomplete = wrapper.findComponent({ name: 'SelectAtom' })

    expect(autocomplete.exists()).toBe(true)
  })

  it('updates v-model correctly', async () => {
    wrapper = createWrapper(SelectAtom, {
      props: {
        modelValue: 'one'
      }
    })

    const updatedValue = 'two'
    await wrapper.setProps({
      modelValue: updatedValue
    })

    const currentComponent = wrapper.getComponent({ name: 'SelectAtom' })
    expect(currentComponent.vm.selectValue).toBe(updatedValue)
  })
})
