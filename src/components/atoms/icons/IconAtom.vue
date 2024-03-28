<template>
  <v-icon v-bind="$attrs" :size="props.size ?? defaultSize"></v-icon>
</template>

<script setup lang="ts">
import type { IconSize } from '@/types';
import iconsSize from '@/composables/iconsSize';

const defaultSize: IconSize = iconsSize();

interface Props {
  size?: string | number;
}
const props = defineProps<Props>();
</script>
