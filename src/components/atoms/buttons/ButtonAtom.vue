<template>
  <v-btn v-bind="$attrs" :density="props.density || 'compact'">
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">
import type { ButtonDensity } from '@/types';

interface Props {
  density?: ButtonDensity;
}
const props = defineProps<Props>();

defineSlots<{
  default(props: {}): any;
}>();
</script>
