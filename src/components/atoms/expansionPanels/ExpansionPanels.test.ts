import { createWrapper, type VueWrapper } from '@/tests/utils'
import ExpansionPanels from './ExpansionPanels.vue'

let wrapper: VueWrapper

const testCopy = 'Expansion test copy'
const slot = `<v-expansion-panel>${testCopy}</v-expansion-panel>`
beforeEach(() => {
  wrapper = createWrapper(ExpansionPanels, {
    slots: {
      default: slot
    }
  })
})

describe('ExpansionPanels', () => {
  it('renders correctly', () => {
    const expansionPanels = wrapper.find('[data-test="a-expansionPanels"]')
    expect(expansionPanels.exists()).toBe(true)
  })

  it('renders default slot with v-expansion-panel correctly', () => {
    expect(wrapper.text()).toContain(testCopy)
  })
})
