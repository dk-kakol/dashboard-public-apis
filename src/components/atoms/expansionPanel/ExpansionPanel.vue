<template>
  <v-expansion-panel
    v-bind="$attrs"
    :expand-icon="props['expand-icon']"
    :collapse-icon="props['collapse-icon']"
    data-test="a-expansionPanel"
  >
    <template #default v-if="$slots.default">
      <slot name="default"></slot>
    </template>
    <template #text v-if="$slots.text">
      <slot name="text"></slot>
    </template>
    <template #title v-if="$slots.title">
      <slot name="title"></slot>
    </template>
  </v-expansion-panel>
</template>

<script setup lang="ts">
type Props = {
  'expand-icon'?: string;
  'collapse-icon'?: string;
};

const props = withDefaults(defineProps<Props>(), {
  'expand-icon': 'mdi-chevron-down',
  'collapse-icon': 'mdi-chevron-up'
});

defineSlots<{
  default(props: {}): any;
  text(props: {}): any;
  title(props: {}): any;
}>();
</script>
