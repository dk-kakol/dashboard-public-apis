import DetailsTd from '@/components/molecules/publicApisTable/detailsTd/DetailsTd.vue'
import { createWrapper, type VueWrapper } from '@/tests/utils'

let wrapper: VueWrapper
const keyText = 'key'

beforeAll(() => {
  wrapper = createWrapper(DetailsTd, {
    props: {
      keyText
    }
  })
})

describe('Details Td', () => {
  it('should render properly', () => {
    const detailsTd = wrapper.find('[data-test="m-detailsTd"]')
    expect(detailsTd.exists()).toBe(true)
  })

  it('should render passed props ', async () => {
    const valueText = 'text'

    await wrapper.setProps({
      valueText
    })
    const detailsTd = wrapper.getComponent({ name: 'DetailsTd' })

    expect(detailsTd.text()).contain(valueText)
    expect(detailsTd.text()).contain(keyText)
  })

  it('should render passed template in slot', () => {
    const valueSlot = 'slot'
    wrapper = createWrapper(DetailsTd, {
      props: {
        keyText
      },
      slots: {
        default: valueSlot
      }
    })

    expect(wrapper.text()).toContain(valueSlot)
  })
})
