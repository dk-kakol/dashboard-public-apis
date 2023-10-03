<template>
  <DefaultTemplate>
    <template #body>
      <div class="text-h1 bg-amber-accent-4" data-test="p-aboutView__title">Elo from About View!</div>
      <div v-if="count" data-test="p-aboutView__countNumber">{{ count }}</div>
      <!-- Widok About, zawiera:
      Opis co to jest
      Sprawdź czy service jest alive, jeśli nie, to włącz mockowanie requestów,
      Link do serwisu
      Kontakt do autora -->
    </template>
  </DefaultTemplate>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DefaultTemplate from '@/components/templates/DefaultTemplate.vue';
// import publicApis from '@/services/http/api/publicApis';
import useTestStore from '@/stores/testStore';
import { storeToRefs } from 'pinia';

// const count = ref<number>();

// await publicApis.fetchList().then((data) => {
//   console.log(data);
//   count.value = data?.data?.count;
// });
const testStore = useTestStore();

try {
  await testStore.fetchPublicApis();
} catch (error) {
  console.log(error);
}
const { count } = storeToRefs(testStore);

const showCount = computed(() => !!count.value);

</script>
