<template>
  <LoaderAtom
    :loading="props.loading" 
    :type="['text']"
    class="d-block"
    data-test="o-publicApisList__loader">
    <PublicApisTable
      :apis="props.apis"
      class="mx-md-5"
      data-test="o-publicApisList__table"></PublicApisTable>
    <PaginationAtom
      v-if="props.apis.length"
      :length="props.pagesCount"
      v-model="currentPage"
      class="mt-5"
      data-test="o-publicApisList__pagination"></PaginationAtom>
  </LoaderAtom>
</template>

<script setup lang="ts">
import PublicApisTable from '@/components/molecules/publicApisTable/PublicApisTable.vue';
import PaginationAtom from '@/components/atoms/pagination/PaginationAtom.vue';
import LoaderAtom from '@/components/atoms/loader/LoaderAtom.vue';
import type { Entries } from '@/types';

type Props = {
  apis: Entries,
  loading: boolean,
  pagesCount: number,
}
const props = defineProps<Props>();
const currentPage = defineModel<number>('currentPage')
</script>
