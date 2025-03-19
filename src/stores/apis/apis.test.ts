import { setActivePinia, createPinia } from 'pinia'
import { useApisStore, useApisFiltersStore } from '@/stores'
import publicApis from '@/services/http/api/publicApis'
import { entriesResponseSchema } from '@/schemas'

let apisStore: ReturnType<typeof useApisStore>

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
    d: (key: string) => key,
    locale: (key: string) => key
  })
}))

describe('Apis Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    apisStore = useApisStore()
  })

  it('has pagesCount getter defined', () => {
    expect(apisStore.pagesCount).toBeDefined()
  })

  it('pagesCount should return apropriete number of pages', () => {
    const dataCases = [
      { countApis: 1, entriesPerPage: 3, expectedResult: 1 },
      { countApis: 4, entriesPerPage: 3, expectedResult: 2 },
      { countApis: 6, entriesPerPage: 6, expectedResult: 1 },
      { countApis: 6, entriesPerPage: 0, expectedResult: 0 }
    ]
    dataCases.forEach((data) => {
      apisStore.countApis = data.countApis
      apisStore.entriesPerPage = data.entriesPerPage
      expect(apisStore.pagesCount).toBe(data.expectedResult)
    })
  })

  it('should have fetchApis action defined', () => {
    expect(apisStore.fetchApis).toBeDefined()
  })

  it('fetchApis action should call fetchList from publicApis service with correct params', async () => {
    const publicApisSpyOn = vi.spyOn(publicApis, 'fetchList')

    await apisStore.fetchApis()
    const apisFilters = useApisFiltersStore()
    const { search, category, auth, cors } = apisFilters.getApisFilters
    expect(publicApisSpyOn).toHaveBeenCalledOnce()
    expect(publicApisSpyOn).toHaveBeenCalledWith({
      offset: 0,
      limit: apisStore.entriesPerPage,
      search,
      category,
      auth,
      cors
    })
  })

  it('fetchApis action should validate response', async () => {
    const entriesResponseSchemaSpyOn = vi.spyOn(entriesResponseSchema, 'parse')

    const response = await apisStore.fetchApis()

    expect(entriesResponseSchemaSpyOn).toHaveBeenCalledOnce()
    expect(entriesResponseSchemaSpyOn).toHaveBeenCalledWith(response?.data)
  })

  it('fetchApis action should set countApis, apis and loading correctly', async () => {
    const response = await apisStore.fetchApis()

    expect(apisStore.countApis).toBe(response?.data.count)
    expect(apisStore.apis).toEqual(response?.data.entries)
    expect(apisStore.loading).toBe(false)
  })
})
