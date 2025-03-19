import { createWrapper, type VueWrapper } from '@/tests/utils'
import SingleExpansionPanel from '@/components/molecules/singleExpansionPanel/SingleExpansionPanel.vue'

let wrapper: VueWrapper

const DEFAULT_SLOT_TEXT = 'default slot text'
const TITLE_SLOT_TEXT = 'title slot text'
const TEXT_SLOT_TEXT = 'text slot text'

beforeEach(() => {
  wrapper = createWrapper(SingleExpansionPanel, {
    slots: {
      default: DEFAULT_SLOT_TEXT,
      title: TITLE_SLOT_TEXT,
      text: TEXT_SLOT_TEXT
    }
  })
})

describe('Single Expansion Panel', () => {
  it('renders correctly', () => {
    const expansionPanels = wrapper.find('[data-test="m-singleExpansionPanel"]')
    expect(expansionPanels.exists()).toBe(true)
  })

  it('renders slots correctly', async () => {
    const expansionPanel = wrapper.find('[data-test="a-expansionPanel"]').find('button')
    await expansionPanel.trigger('click')

    expect(wrapper.text()).toContain(DEFAULT_SLOT_TEXT)
    expect(wrapper.text()).toContain(TITLE_SLOT_TEXT)
    expect(wrapper.text()).toContain(TEXT_SLOT_TEXT)
  })
})
