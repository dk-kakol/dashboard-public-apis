<template>
  <v-app :theme="props?.themeName">
    <v-main>
      <slot name="story" :class="props.class" :style="props.style"></slot>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

interface Props {
  themeName: string,
  localeName: string,
  class: string,
  style: string,
}

const props = defineProps<Props>();

const { locale } = useI18n({
  // inheritLocale działa, ale zostawiam useGlobal bo daje możliwość zmiany locale
  // inheritLocale: true
  useScope: 'global',
});

locale.value = props.localeName;

</script>