import { createWrapper, i18n, messages, type VueWrapper } from '@/tests/utils'
import HeaderOrganism from '@/components/organisms/header/HeaderOrganism.vue'

let wrapper: VueWrapper
const defaultLocale: string = i18n.global.locale.value

beforeAll(() => {
  wrapper = createWrapper(HeaderOrganism, {
    // global: {
    //   mocks: {
    //     $t: (msg: string) => msg,
    //     $i18n: { availableLocales: ['pl', 'en'] },
    //   }
    // }
  })
})

describe('Header Organism', () => {
  it('should render header title properly', () => {
    const headerTitleText = wrapper.get('[class="v-toolbar-title__placeholder"]').text()

    // if mocks above uncommented, you can check:
    // expect(headerTitleText).toBe('template.header.title');

    // if mocks above commented, component is using i18n plugin, and you can check exact message:
    expect(headerTitleText).toBe(messages.en.template.header.title)
  })

  it('should render buttons for all available locales', () => {
    const headerLocaleButtons = wrapper.findAll('[data-test="o-header__localeButton"]')

    expect(headerLocaleButtons).toHaveLength(i18n.global.availableLocales?.length)
  })

  it('should highlight button with initial locale', () => {
    const highLightedLocaleButtons = wrapper.findAll(
      '.v-btn--variant-tonal[data-test="o-header__localeButton"]'
    )

    expect(highLightedLocaleButtons).toHaveLength(1)
    expect(highLightedLocaleButtons[0].text()).toBe(defaultLocale)
  })

  it('should switch locale after button clicked', async () => {
    const localeButton = wrapper.get('.v-btn--variant-text[data-test="o-header__localeButton"]')
    const localeButtonText = localeButton.text()

    await localeButton.trigger('click')
    const headerTitleText = wrapper.get('[class="v-toolbar-title__placeholder"]').text()
    const highLightedLocaleButtons = wrapper.findAll(
      '.v-btn--variant-tonal[data-test="o-header__localeButton"]'
    )

    expect(localeButton.classes()).toContain('v-btn--variant-tonal')
    expect(highLightedLocaleButtons).toHaveLength(1)
    expect(headerTitleText).toBe(
      messages[localeButtonText as keyof typeof messages].template.header.title
    )
  })

  it('should open NavigationDrawer when Menu Button Clicked', async () => {
    const headerMenuButton = wrapper.get('[data-test="o-header__menuButton"]')
    await headerMenuButton.trigger('click')
    const headerNavigationDrawer = wrapper.get('[data-test="o-header__navigationDrawer"]')

    expect(headerNavigationDrawer.classes()).toContain('v-navigation-drawer--active')
  })
})
