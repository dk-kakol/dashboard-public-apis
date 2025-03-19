import { createWrapper, type VueWrapper } from '@/tests/utils'
import TextFieldAtom from '@/components/atoms/textField/TextFieldAtom.vue'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = createWrapper(TextFieldAtom)
})

describe('TextFieldAtom', () => {
  it('renders correctly', () => {
    const textField = wrapper.find('[data-test="a-textFieldAtom"]')
    expect(textField.exists()).toBe(true)
  })

  it('updates v-model correctly', async () => {
    const testValue = 'updated'
    await wrapper.setProps({
      modelValue: testValue
    })
    const textField = wrapper.getComponent({ name: 'TextFieldAtom' })
    expect(textField.vm.inputValue).toBe(testValue)
  })

  it('update v-model on setValue on input', async () => {
    const testValue = 'updated'

    await wrapper.find('input').setValue(testValue)

    const textField = wrapper.getComponent({ name: 'TextFieldAtom' })
    expect(textField.vm.inputValue).toBe(testValue)
  })

  it('emit change event on setValue on input', async () => {
    const testValue = 'updated'

    await wrapper.find('input').setValue(testValue)

    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('renders append slot correctly', () => {
    const wrapper = createWrapper(TextFieldAtom, {
      slots: {
        append: '<div class="append-slot">Append Slot Content</div>'
      }
    })
    expect(wrapper.find('.append-slot').exists()).toBe(true)
    expect(wrapper.find('.append-slot').text()).toBe('Append Slot Content')
  })

  it('renders append-inner slot correctly', () => {
    const wrapper = createWrapper(TextFieldAtom, {
      slots: {
        'append-inner': '<div class="append-inner-slot">Append Inner Slot Content</div>'
      }
    })
    expect(wrapper.find('.append-inner-slot').exists()).toBe(true)
    expect(wrapper.find('.append-inner-slot').text()).toBe('Append Inner Slot Content')
  })

  it('renders prepend slot correctly', () => {
    const wrapper = createWrapper(TextFieldAtom, {
      slots: {
        prepend: '<div class="prepend-slot">Prepend Slot Content</div>'
      }
    })
    expect(wrapper.find('.prepend-slot').exists()).toBe(true)
    expect(wrapper.find('.prepend-slot').text()).toBe('Prepend Slot Content')
  })

  it('renders prepend-inner slot correctly', () => {
    const wrapper = createWrapper(TextFieldAtom, {
      slots: {
        'prepend-inner': '<div class="prepend-inner-slot">Prepend Inner Slot Content</div>'
      }
    })
    expect(wrapper.find('.prepend-inner-slot').exists()).toBe(true)
    expect(wrapper.find('.prepend-inner-slot').text()).toBe('Prepend Inner Slot Content')
  })
})
