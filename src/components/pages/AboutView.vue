<template>
  <DefaultTemplate>
    <template #body>
      <div class="text-h1 bg-amber-accent-4" data-test="p-aboutView__title">
        Elo from About View!
      </div>
      <div>{{ t('template.header.title') }}</div>
      <div>***</div>
      <div v-for="(content, index) in testArray" :key="index">
        {{ rt(content.title) }}
      </div>
      <div>**</div>
      <div v-for="(content, index) in secondTestArray" :key="index">
        {{ content }}
      </div>
      <PaginationAtom :length="7" v-model="currentPagination"></PaginationAtom>
      <!-- Widok About, zawiera:
      Opis co to jest
      Sprawdź czy service jest alive, jeśli nie, to włącz mockowanie requestów,
      Link do serwisu
      Kontakt do autora -->
    </template>
  </DefaultTemplate>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import DefaultTemplate from '@/components/templates/DefaultTemplate.vue';
import PaginationAtom from '@/components/atoms/pagination/PaginationAtom.vue';
import useResourcesStore from '@/stores/resources/resources';

// const { t, tm, rt, locale } = useI18n({
const { t, tm, rt } = useI18n({
  // inheritLocale działa, ale zostawiam useGlobal bo daje możliwość zmiany locale
  // inheritLocale: true
  useScope: 'global'
});
interface TestArrayItem {
  title: string;
}
const testArray: TestArrayItem[] = tm('template.testArray');
const secondTestArray: string[] = tm('template.secondTestArray');
// const templateLangs = tm('template');

const currentPagination = ref<number>(2);

const resourcesStore = useResourcesStore();
await resourcesStore.fetchResources();
// Widok About, zawiera:
// Opis co to jest
// Sprawdź czy service jest alive, jeśli nie, to włącz mockowanie requestów,
// Link do serwisu
// Kontakt do autora
</script>
