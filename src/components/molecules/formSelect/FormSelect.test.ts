import { createWrapper, type VueWrapper } from '@/tests/utils'
import FormSelect from '@/components/molecules/formSelect/FormSelect.vue'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = createWrapper(FormSelect, {
    props: {
      name: 'formSelect'
    }
  })
})

describe('FormSelect', () => {
  it('renders correctly', () => {
    const select = wrapper.findComponent({ name: 'SelectAtom' })

    expect(select.exists()).toBe(true)
  })

  it('updates v-model correctly', async () => {
    wrapper = createWrapper(FormSelect, {
      props: {
        name: 'formSelect',
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
