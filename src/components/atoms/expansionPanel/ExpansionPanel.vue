<template>
  <v-expansion-panel
    v-bind="$attrs"
    :expandIcon="props.expandIcon"
    :collapseIcon="props.collapseIcon"
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
  expandIcon?: string
  collapseIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  expandIcon: 'mdi-chevron-down',
  collapseIcon: 'mdi-chevron-up'
})

defineSlots<{
  default(props: Record<string, unknown>): unknown
  text(props: Record<string, unknown>): unknown
  title(props: Record<string, unknown>): unknown
}>()
</script>
