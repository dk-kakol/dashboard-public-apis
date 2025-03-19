import NavigationDrawer from './NavigationDrawer.vue'
import { VListItem } from 'vuetify/lib/components/index.mjs'
import { createWrapper, type VueWrapper } from '@/tests/utils'
let wrapper: VueWrapper

beforeAll(() => {
  wrapper = createWrapper(NavigationDrawer, {
    props: {
      modelValue: true,
      items: [
        { title: 'template.menu.aboutTitle', route: '/eloRoute' },
        { title: 'template.menu.homeTitle', route: '/eloRoute2' }
      ]
    }
  })
})

describe('NavigationDrawer', () => {
  it('should render all passed linked items', () => {
    const renderedListItems = wrapper.findAll('[data-test="m-navigationDrawer__listItem"]')

    expect(renderedListItems.length).toBe(2)
  })

  it('list items should have apropiete to atributes', () => {
    const renderedListItems = wrapper.findAllComponents<typeof VListItem>(
      '[data-test="m-navigationDrawer__listItem"]'
    )

    expect(renderedListItems[0].props('to')).toBe('/eloRoute')
    expect(renderedListItems[1].props('to')).toBe('/eloRoute2')
  })
})
