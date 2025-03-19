<template>
  <ExpansionPanels data-test="m-singleExpansionPanel">
    <ExpansionPanel v-bind="$attrs">
      <template #default v-if="$slots.default">
        <slot name="default"></slot>
      </template>
      <template #text v-if="$slots.text">
        <slot name="text"></slot>
      </template>
      <template #title v-if="$slots.title">
        <slot name="title"></slot>
      </template>
    </ExpansionPanel>
  </ExpansionPanels>
</template>

<script setup lang="ts">
import ExpansionPanels from '@/components/atoms/expansionPanels/ExpansionPanels.vue'
import ExpansionPanel from '@/components/atoms/expansionPanel/ExpansionPanel.vue'

defineSlots<{
  default(props: Record<string, unknown>): unknown
  text(props: Record<string, unknown>): unknown
  title(props: Record<string, unknown>): unknown
}>()
</script>
