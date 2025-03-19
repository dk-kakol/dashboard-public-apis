import type { Mock } from 'vitest'
import { ref } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import { useResourcesStore } from '@/stores/resources/resources'
import resources from '@/services/http/api/resources'

let resourcesStore: ReturnType<typeof useResourcesStore>

describe('Resources Store', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    setActivePinia(createPinia())
    resourcesStore = useResourcesStore()
  })

  it('should have getResources defined', () => {
    expect(resourcesStore.getResources).toBeDefined()
  })

  it('should have fetchResources defined', () => {
    expect(resourcesStore.fetchResources).toBeDefined()
  })

  it('fetchResources should call getResources from resources service', () => {
    resourcesStore.fetchResources()

    // with initial fetch, expect to call it 2 times:
    expect(resources.fetchResources).toHaveBeenCalledTimes(2)
  })

  it('should have defined getAuthResources', () => {
    expect(resourcesStore.getAuthResources).toBeDefined()
  })

  it('getAuthResources should have correct value based on getResources', () => {
    expect(resourcesStore.getAuthResources).toBe(resourcesStore.getResources?.auth)
  })

  it('should have defined getCategoriesResources', () => {
    expect(resourcesStore.getCategoriesResources).toBeDefined()
  })

  it('getCategoriesResources should have correct value based on getResources', () => {
    expect(resourcesStore.getCategoriesResources).toBe(resourcesStore.getResources?.categories)
  })

  it('should have defined getCorsResources', () => {
    expect(resourcesStore.getCorsResources).toBeDefined()
  })

  it('getCorsResources should have correct value based on getResources', () => {
    expect(resourcesStore.getCorsResources).toBe(resourcesStore.getResources?.cors)
  })

  it('should have defined getPermissionsResources', () => {
    expect(resourcesStore.getPermissionsResources).toBeDefined()
  })

  it('getPermissionsResources should have correct value based on getResources', () => {
    expect(resourcesStore.getPermissionsResources).toBe(resourcesStore.getResources?.permissions)
  })

  it('should expose isResourcesLoading true value if fetching is in loading state', async () => {
    const mocked = resources.fetchResources as Mock
    mocked.mockReturnValueOnce({
      isLoading: ref(true)
    })
    setActivePinia(createPinia())
    resourcesStore = useResourcesStore()

    expect(resourcesStore.isResourcesLoading).toBe(true)
  })
})
