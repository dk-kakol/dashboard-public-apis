<template>
  <DefaultTemplate>
    <template #body>
      <div class="text-h1 bg-amber-accent-4">Elo from Home View!</div>
      <div>{{ t('template.header.title') }}</div>
      <div>***</div>
      <div v-for="content in testArray">
        {{ rt(content.title) }}
      </div>
      <div>**</div>
      <div v-for="content in secondTestArray">
        {{ content }}
      </div>
    </template>
  </DefaultTemplate>
</template>

<script setup lang="ts">
import DefaultTemplate from '@/components/templates/DefaultTemplate.vue';
import { useI18n } from 'vue-i18n';

const { t, tm, rt, locale } = useI18n({
  // inheritLocale działa, ale zostawiam useGlobal bo daje możliwość zmiany locale
  // inheritLocale: true
  useScope: 'global',
});
interface TestArrayItem {
  title: string,
}
const testArray: TestArrayItem[] = tm('template.testArray');
const secondTestArray: string[] = tm('template.secondTestArray');
const templateLangs = tm('template');
</script>