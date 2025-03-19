import PaginationAtom from '@/components/atoms/pagination/PaginationAtom.vue'
import { createWrapper, type VueWrapper } from '@/tests/utils'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = createWrapper(PaginationAtom)
})

describe('PaginationAtom', () => {
  it('shoud render properly', () => {
    const pagination = wrapper.findComponent({ name: 'v-pagination' })

    expect(pagination.exists()).toBe(true)
  })

  it('should all buttons be disabled when disabled prop is set', async () => {
    await wrapper.setProps({
      disabled: true,
      length: 3,
      'total-visible': 3
    })
    const buttons = wrapper.findAll('[type="button"]')

    buttons.forEach((button) => {
      expect(button.classes()).toContain('v-btn--disabled')
    })
  })

  it('should render prev and next buttons', () => {
    const prevButton = wrapper.find('[data-test="v-pagination-prev"] i')
    const nextButton = wrapper.find('[data-test="v-pagination-next"] i')

    expect(prevButton.exists()).toBe(true)
    expect(prevButton.classes()).toContain('mdi-menu-left')
    expect(nextButton.exists()).toBe(true)
    expect(nextButton.classes()).toContain('mdi-menu-right')
  })

  it('should handle v-model: set modelValue from props', async () => {
    await wrapper.setProps({
      modelValue: 2,
      length: 3,
      'total-visible': 3
    })
    const currentComponent = wrapper.getComponent({ name: 'PaginationAtom' })
    expect(currentComponent.props('modelValue')).toBe(2)
  })

  it('should handle v-model: set and update modelValue (currentPage)', async () => {
    await wrapper.setProps({
      modelValue: 2,
      'onUpdate:modelValue': (e: Event) => wrapper.setProps({ modelValue: e }),
      length: 3,
      'total-visible': 3
    })
    const currentComponent = wrapper.getComponent({ name: 'PaginationAtom' })
    const thirdPage = wrapper.findAll('[type="button"]').filter((e) => e.text() === '3')

    await thirdPage[0].trigger('click')

    expect(currentComponent.props('modelValue')).toBe(3)
  })
})
