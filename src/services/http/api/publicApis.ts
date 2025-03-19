import Http from '@/services/http/index'
import Endpoints from '@/services/http/endpoints'
import { ApiEndpoints } from '@/types'
import type { EntriesResponse, FetchApisParams } from '@/types'

export default {
  fetchList(params?: FetchApisParams) {
    return Http().get<EntriesResponse>(Endpoints().get(ApiEndpoints.list), { params })
  }
}
