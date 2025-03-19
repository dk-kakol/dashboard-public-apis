import ColAtom from '@/components/atoms/col/ColAtom.vue'
import { createWrapper, type VueWrapper } from '@/tests/utils'

let wrapper: VueWrapper

beforeAll(() => {
  wrapper = createWrapper(ColAtom)
})

describe('Col Atom', () => {
  it('should render properly', () => {
    const colElement = wrapper.find('[data-test="a-colAtom"]')
    expect(colElement.exists()).toBe(true)
  })

  it('should render passed template in slot', () => {
    const slotText = 'ColAtom slot Text'
    wrapper = createWrapper(ColAtom, {
      slots: {
        default: slotText
      }
    })

    expect(wrapper.text()).toContain(slotText)
  })

  it('should bind to v-col element incoming props ', async () => {
    const propsToCheck = {
      cols: 6,
      lg: 4,
      'align-self': 'end'
    }
    const expectedClasses = ['v-col-lg-4', 'v-col-6', 'align-self-end']

    await wrapper.setProps({
      ...propsToCheck
    })
    const colElement = wrapper.getComponent('[data-test="a-colAtom"]')

    expectedClasses.forEach((value) => expect(colElement.classes()).includes(value))
  })
})
