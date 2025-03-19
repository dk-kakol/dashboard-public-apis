import LoaderAtom from '@/components/atoms/loader/LoaderAtom.vue'
import { createWrapper, type VueWrapper } from '@/tests/utils'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = createWrapper(LoaderAtom)
})

describe('Loader Atom', () => {
  it('should not render loader when slot is passed', () => {
    const slotText = '<p>Loaded Text</p>'
    wrapper = createWrapper(LoaderAtom, {
      slots: {
        default: slotText
      }
    })

    const loader = wrapper.find('[data-test="a-loaderAtom"]').find('.v-skeleton-loader__bone')

    expect(wrapper.html()).toContain(slotText)
    expect(loader.exists()).toBe(false)
  })

  it('should not render loader when is not loading', () => {
    const loader = wrapper.find('[data-test="a-loaderAtom"]').find('.v-skeleton-loader__bone')

    expect(loader.exists()).toBe(false)
  })

  it('should render loader when loading', async () => {
    await wrapper.setProps({
      loading: true
    })
    const loader = wrapper.find('[data-test="a-loaderAtom"]').find('.v-skeleton-loader__bone')

    expect(loader.exists()).toBe(true)
  })

  it('should render loader when slot is passed, but loading is true', () => {
    const slotText = '<p>Loaded Text</p>'
    wrapper = createWrapper(LoaderAtom, {
      slots: {
        default: slotText
      },
      props: {
        loading: true
      }
    })

    const loader = wrapper.find('[data-test="a-loaderAtom"]').find('.v-skeleton-loader__bone')

    expect(wrapper.html()).not.toContain(slotText)
    expect(loader.exists()).toBe(true)
  })

  it('should render card type loader by default', async () => {
    await wrapper.setProps({
      loading: true
    })
    const loader = wrapper.find('[data-test="a-loaderAtom"]').find('.v-skeleton-loader__card')

    expect(loader.exists()).toBe(true)
  })

  it('should be able to render complex loader', async () => {
    await wrapper.setProps({
      loading: true,
      type: ['text', 'card']
    })
    const loaderText = wrapper.find('[data-test="a-loaderAtom"]').find('.v-skeleton-loader__text')
    const loaderCard = wrapper.find('[data-test="a-loaderAtom"]').find('.v-skeleton-loader__card')

    expect(loaderText.exists()).toBe(true)
    expect(loaderCard.exists()).toBe(true)
  })
})
