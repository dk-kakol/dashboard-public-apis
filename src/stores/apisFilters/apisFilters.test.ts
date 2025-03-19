import { setActivePinia, createPinia } from 'pinia'
import { useApisFiltersStore } from '@/stores'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { ref, nextTick } from 'vue'
import type { Mock } from 'vitest'

let store: ReturnType<typeof useApisFiltersStore>

const mockForm = {
  values: ref('values'),
  errors: ref('errors'),
  meta: ref('meta'),
  validate: vi.fn(),
  resetForm: vi.fn()
}

vi.mock('vee-validate', () => ({
  useForm: vi.fn(() => mockForm)
}))

vi.mock('vue-i18n', () => ({
  useI18n: vi.fn(() => ({
    locale: ref('en')
  }))
}))

describe('apisFiltersStore', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    setActivePinia(createPinia())
  })

  it('initializes correctly', () => {
    ;(useForm as Mock).mockReturnValue(mockForm)
    store = useApisFiltersStore()

    expect(store.getApisFilters).toBe(mockForm.values.value)
    expect(store.getApisFiltersErrors).toBe(mockForm.errors.value)
    expect(store.getApisFiltersMeta).toBe(mockForm.meta.value)
    expect(store.validateApisFilters).toBeDefined()
    expect(store.validateApisFilters).toBeDefined()
  })

  it('validates filters on locale change', async () => {
    const mockLocale = ref('pl')
    ;(useI18n as Mock).mockReturnValue({ locale: mockLocale })
    store = useApisFiltersStore()
    mockLocale.value = 'en'
    await nextTick()

    expect(mockForm.validate).toHaveBeenCalledOnce()
  })

  it('does not validate filters if no errors on locale change', async () => {
    ;(useForm as Mock).mockReturnValue({
      ...mockForm,
      errors: ref('')
    })
    const mockLocale = ref('pl')
    ;(useI18n as Mock).mockReturnValue({ locale: mockLocale })
    store = useApisFiltersStore()
    mockLocale.value = 'en'
    await nextTick()

    expect(mockForm.validate).toHaveBeenCalledTimes(0)
  })

  it('resets filters correctly', () => {
    ;(useForm as Mock).mockReturnValue(mockForm)
    store = useApisFiltersStore()

    store.resetApisFilters()
    expect(mockForm.resetForm).toHaveBeenCalledOnce()
  })

  it('validate filters correctly', () => {
    ;(useForm as Mock).mockReturnValue(mockForm)
    store = useApisFiltersStore()

    store.validateApisFilters()
    expect(mockForm.validate).toHaveBeenCalledOnce()
  })
})
