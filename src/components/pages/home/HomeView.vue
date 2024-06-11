<template>
  <DefaultTemplate data-test="p-homeView__defaultTemplate">
    <template #body>
      <PublicApisList :apis :loading :pagesCount v-model:currentPage="currentPage"></PublicApisList>
    </template>
  </DefaultTemplate>
</template>

<script setup lang="ts">
import DefaultTemplate from '@/components/templates/DefaultTemplate.vue';
import PublicApisList from '@/components/organisms/publicApisList/PublicApisList.vue';
import { watch } from 'vue';
import useApisStore from '@/stores/apis/apis';
import { storeToRefs } from 'pinia';

const apisStore = useApisStore();

const { currentPage, apis, pagesCount, loading } = storeToRefs(apisStore);

// array of multiple sources triggering refetching apis
watch([currentPage], async () => apisStore.fetchApis(), { immediate: true });
</script>
