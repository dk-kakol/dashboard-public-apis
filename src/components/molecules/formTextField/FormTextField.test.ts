import { createWrapper, type VueWrapper, flushPromises } from '@/tests/utils'
import FormTextField from '@/components/molecules/formTextField/FormTextField.vue'
import { z } from '@/plugins/zod'
import { toTypedSchema } from '@vee-validate/zod'

let wrapper: VueWrapper
const errorMessage = 'Invalid input'

beforeEach(() => {
  wrapper = createWrapper(FormTextField, {
    props: {
      name: 'textField',
      rules: toTypedSchema(z.string().excludeSpecialRefine())
    }
  })
})

describe('FormTextField', () => {
  it('renders correctly', () => {
    const textField = wrapper.find('[data-test="m-formTextField"]')
    expect(textField.exists()).toBe(true)
  })

  it('updates v-model correctly', async () => {
    const testValue = 'updated'
    await wrapper.setProps({
      modelValue: testValue
    })
    const textField = wrapper.getComponent({ name: 'FormTextField' })
    expect(textField.vm.value).toBe(testValue)
  })

  it('update v-model on setValue on input', async () => {
    const testValue = 'updated'

    await wrapper.find('input').setValue(testValue)

    const textField = wrapper.getComponent({ name: 'FormTextField' })
    expect(textField.vm.value).toBe(testValue)
  })

  it('renders append slot correctly', () => {
    const wrapper = createWrapper(FormTextField, {
      props: {
        name: 'textField'
      },
      slots: {
        append: '<div class="append-slot">Append Slot Content</div>'
      }
    })
    expect(wrapper.find('.append-slot').exists()).toBe(true)
    expect(wrapper.find('.append-slot').text()).toBe('Append Slot Content')
  })

  it('renders append-inner slot correctly', () => {
    const wrapper = createWrapper(FormTextField, {
      props: {
        name: 'textField'
      },
      slots: {
        'append-inner': '<div class="append-inner-slot">Append Inner Slot Content</div>'
      }
    })
    expect(wrapper.find('.append-inner-slot').exists()).toBe(true)
    expect(wrapper.find('.append-inner-slot').text()).toBe('Append Inner Slot Content')
  })

  it('renders prepend slot correctly', () => {
    const wrapper = createWrapper(FormTextField, {
      props: {
        name: 'textField'
      },
      slots: {
        prepend: '<div class="prepend-slot">Prepend Slot Content</div>'
      }
    })
    expect(wrapper.find('.prepend-slot').exists()).toBe(true)
    expect(wrapper.find('.prepend-slot').text()).toBe('Prepend Slot Content')
  })

  it('renders prepend-inner slot correctly', () => {
    const wrapper = createWrapper(FormTextField, {
      props: {
        name: 'textField'
      },
      slots: {
        'prepend-inner': '<div class="prepend-inner-slot">Prepend Inner Slot Content</div>'
      }
    })
    expect(wrapper.find('.prepend-inner-slot').exists()).toBe(true)
    expect(wrapper.find('.prepend-inner-slot').text()).toBe('Prepend Inner Slot Content')
  })

  it('should not display error message on change with valid input', async () => {
    const testValue = 'Valid Input'

    await wrapper.find('input').setValue(testValue)
    await flushPromises()

    expect(wrapper.text()).not.toContain(errorMessage)
  })

  it('should display error message on change with invalid input', async () => {
    const testValue = 'Invalid Input with special character <'

    await wrapper.find('input').setValue(testValue)
    await flushPromises()

    expect(wrapper.text()).toContain(errorMessage)
  })
})
