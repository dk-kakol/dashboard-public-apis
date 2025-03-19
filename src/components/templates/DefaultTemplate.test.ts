import { createWrapper, type VueWrapper } from '@/tests/utils'
import DefaultTemplate from '@/components/templates/DefaultTemplate.vue'

let wrapper: VueWrapper

beforeAll(() => {
  wrapper = createWrapper(DefaultTemplate, {
    slots: {
      body: 'Main Content'
    }
  })
})

describe('Default template', () => {
  it('should render properly all sections', () => {
    const Sections = [
      wrapper.findComponent({ name: 'HeaderOrganism' }),
      wrapper.findComponent({ name: 'v-main' })
    ]

    Sections.forEach((section) => expect(section.exists()).toBe(true))
  })

  it('should render passed template in the main section', () => {
    const mainSection = wrapper.findComponent({ name: 'v-main' })

    expect(mainSection.text()).toContain('Main Content')
    // or
    // expect(mainSection.html()).toContain('Main Content');
  })
})
