import { useHttp } from '@/composables/useHttp/useHttp'
import { ApiEndpoints } from '@/types'
import { resourcesSchema } from '@/schemas'

export default {
  fetchResources() {
    return useHttp({
      endpoint: ApiEndpoints.resources,
      responseSchema: resourcesSchema,
      options: { immediate: false }
    })
  }
}
