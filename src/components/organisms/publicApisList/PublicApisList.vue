<template>
  <PublicApisFilters @filter="onFilter" data-test="o-publicApisList__filters"></PublicApisFilters>
  <LoaderAtom
    :loading="props.loading"
    :type="['text']"
    class="d-block"
    data-test="o-publicApisList__loader"
  >
    <PublicApisTable
      :apis="props.apis"
      class="mx-md-5"
      data-test="o-publicApisList__table"
    ></PublicApisTable>
    <PaginationAtom
      v-if="props.apis.length"
      :length="props.pagesCount"
      v-model="currentPage"
      :totalVisible
      :density
      class="mt-5"
      data-test="o-publicApisList__pagination"
    ></PaginationAtom>
  </LoaderAtom>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

import PublicApisFilters from '@/components/organisms/publicApisFilters/PublicApisFilters.vue'
import PublicApisTable from '@/components/molecules/publicApisTable/PublicApisTable.vue'
import PaginationAtom from '@/components/atoms/pagination/PaginationAtom.vue'
import LoaderAtom from '@/components/atoms/loader/LoaderAtom.vue'

import type { Entries } from '@/types'
type Props = {
  apis: Entries
  loading: boolean
  pagesCount: number
}
const props = defineProps<Props>()
const currentPage = defineModel<number>('currentPage')

const { smAndUp } = useDisplay()
const totalVisible = computed<number>(() => (smAndUp.value ? 6 : 3))
const density = computed<string>(() => (smAndUp.value ? 'default' : 'compact'))

type Emits = {
  (e: 'filter'): void
}
const emit = defineEmits<Emits>()

const onFilter = function () {
  emit('filter')
}
</script>
