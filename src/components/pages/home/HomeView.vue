<template>
  <DefaultTemplate data-test="p-homeView__defaultTemplate">
    <template #body>
      <PublicApisList
        :apis
        :loading
        :pagesCount
        v-model:currentPage="currentPage"
        @filter="onFilter"
      ></PublicApisList>
    </template>
  </DefaultTemplate>
</template>

<script setup lang="ts">
import DefaultTemplate from '@/components/templates/DefaultTemplate.vue'
import PublicApisList from '@/components/organisms/publicApisList/PublicApisList.vue'
import { watch } from 'vue'
import { useApisStore } from '@/stores'
import { useApisFiltersStore } from '@/stores'
import { storeToRefs } from 'pinia'

const apisStore = useApisStore()

const { currentPage, apis, pagesCount, loading } = storeToRefs(apisStore)

watch([currentPage], async () => apisStore.fetchApis(), { immediate: true })

const apisFiltersStore = useApisFiltersStore()
const onFilter = async function () {
  const { valid } = await apisFiltersStore.validateApisFilters()
  if (!valid) return
  await apisStore.fetchApis()
}
</script>
