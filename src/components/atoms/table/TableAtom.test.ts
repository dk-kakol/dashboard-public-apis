import TableAtom from '@/components/atoms/table/TableAtom.vue'
import { createWrapper, type VueWrapper } from '@/tests/utils'

let wrapper: VueWrapper

beforeAll(() => {
  wrapper = createWrapper(TableAtom)
})

describe('Table Atom', () => {
  it('should render properly', () => {
    const table = wrapper.find('[data-test="a-tableAtom"]')
    expect(table.exists()).toBe(true)
  })

  it('should render passed template in slot', () => {
    const slotText = 'ButtonText'
    wrapper = createWrapper(TableAtom, {
      slots: {
        default: slotText
      }
    })

    expect(wrapper.text()).toContain(slotText)
  })
})
