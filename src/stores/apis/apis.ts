import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Entries, FetchApisParams } from '@/types'
import publicApis from '@/services/http/api/publicApis'
import { entriesResponseSchema } from '@/schemas'
import { useApisFiltersStore } from '@/stores'

export const useApisStore = defineStore('apisStore', () => {
  const currentPage = ref<number>(1)

  const entriesPerPage = ref<number>(20)

  const apis = ref<Entries>([])

  const countApis = ref<number>()

  const pagesCount = computed<number>(() => {
    if (!entriesPerPage.value) return 0
    return Math.ceil((countApis.value ?? 0) / entriesPerPage.value)
  })

  const loading = ref<boolean>(false)

  const apisFilters = useApisFiltersStore()

  const fetchApis = async () => {
    loading.value = true
    try {
      const { search, category, auth, cors } = apisFilters.getApisFilters
      const params: FetchApisParams = {
        offset: (currentPage.value - 1) * entriesPerPage.value,
        limit: entriesPerPage.value,
        search,
        category,
        auth,
        cors
      }
      const response = await publicApis.fetchList(params)
      await entriesResponseSchema.parse(response.data)
      apis.value = response.data.entries
      countApis.value = response.data.count
      return response
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  // sockets: initial verification if works with backend
  // const socket = new WebSocket('ws://localhost:4000')
  // const socket = new WebSocket('wss://apis.dkakol.usermd.net')

  // socket.onmessage = (event) => {
  //   if (event?.data === 'apiEntriesUpdated') fetchApis();
  // }

  // const sendMessage = () => {
  //   const data = 'apiEntriesUpdated';
  //   socket.send(data);
  // };

  // socket.onopen = () => sendMessage()

  return {
    countApis,
    currentPage,
    entriesPerPage,
    apis,
    pagesCount,
    loading,
    fetchApis
  }
})
