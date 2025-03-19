import { createWrapper, type VueWrapper } from '@/tests/utils'
import ExpansionPanel from '@/components/atoms/expansionPanel/ExpansionPanel.vue'
import { defineComponent } from 'vue'
import { VExpansionPanel } from 'vuetify/components'

let wrapper: VueWrapper
const DEFAULT_SLOT_TEXT = 'default slot text'
const TITLE_SLOT_TEXT = 'title slot text'
const TEXT_SLOT_TEXT = 'text slot text'

const Component = defineComponent({
  components: { ExpansionPanel },
  template: `
    <v-expansion-panels>
      <ExpansionPanel class="test" v-bind="$attrs">
        <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
          <slot :name="slot" v-bind="scope || {}"/>
        </template>
      </ExpansionPanel>
    </v-expansion-panels>`
})

beforeEach(() => {
  wrapper = createWrapper(Component, {
    slots: {
      default: DEFAULT_SLOT_TEXT,
      title: TITLE_SLOT_TEXT,
      text: TEXT_SLOT_TEXT
    }
  })
})

describe('Expansion Panel', () => {
  it('renders correctly', () => {
    const expansionPanel = wrapper.find('[data-test="a-expansionPanel"]')
    expect(expansionPanel.exists()).toBe(true)
  })

  it('uses default expand and collapse icons', () => {
    const { expandIcon, collapseIcon } = wrapper
      .getComponent<typeof VExpansionPanel>('.v-expansion-panel')
      .props()
    expect(expandIcon).toBe('mdi-chevron-down')
    expect(collapseIcon).toBe('mdi-chevron-up')
  })

  it('overwrite expand and collapse default icons from props', async () => {
    await wrapper.setProps({
      'expand-icon': 'mdi-arrow-up',
      'collapse-icon': 'mdi-arrow-down'
    })

    const { expandIcon, collapseIcon } = wrapper
      .getComponent<typeof VExpansionPanel>('.v-expansion-panel')
      .props()
    expect(expandIcon).toBe('mdi-arrow-up')
    expect(collapseIcon).toBe('mdi-arrow-down')
  })

  it('renders slots content', async () => {
    const expansionPanel = wrapper.find('[data-test="a-expansionPanel"]').find('button')
    await expansionPanel.trigger('click')

    expect(wrapper.text()).toContain(DEFAULT_SLOT_TEXT)
    expect(wrapper.text()).toContain(TITLE_SLOT_TEXT)
    expect(wrapper.text()).toContain(TEXT_SLOT_TEXT)
  })
})
