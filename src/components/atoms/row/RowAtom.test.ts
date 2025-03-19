import RowAtom from '@/components/atoms/row/RowAtom.vue'
import { createWrapper, type VueWrapper } from '@/tests/utils'

let wrapper: VueWrapper

beforeAll(() => {
  wrapper = createWrapper(RowAtom)
})

describe('Row Atom', () => {
  it('should render properly', () => {
    const rowElement = wrapper.find('[data-test="a-rowAtom"]')
    expect(rowElement.exists()).toBe(true)
  })

  it('should render passed template in slot', () => {
    const slotText = 'RowAtom Slot Text'
    wrapper = createWrapper(RowAtom, {
      slots: {
        default: slotText
      }
    })

    expect(wrapper.text()).toContain(slotText)
  })

  it('should bind to v-row element incoming props ', async () => {
    const propsToCheck = {
      'no-gutters': true,
      justify: 'end',
      align: 'end'
    }
    const expectedClasses = ['v-row--no-gutters', 'align-end', 'justify-end']

    await wrapper.setProps({
      ...propsToCheck
    })
    console.log(wrapper.html())
    const rowElement = wrapper.getComponent('[data-test="a-rowAtom"]')

    expectedClasses.forEach((value) => expect(rowElement.classes()).includes(value))
  })
})
