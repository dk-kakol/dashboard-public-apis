<template>
  <v-expansion-panels v-bind="$attrs" data-test="a-expansionPanels">
    <slot></slot>
  </v-expansion-panels>
</template>

<script setup lang="ts">
defineSlots<{
  default(props: {}): any;
}>();
</script>
