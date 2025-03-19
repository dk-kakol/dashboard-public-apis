<template>
  <v-text-field
    v-bind="$attrs"
    v-model="inputValue"
    @blur="emit('blur', $event)"
    @change="emit('change', $event)"
    data-test="a-textFieldAtom"
  >
    <template #append v-if="$slots.append">
      <slot name="append"></slot>
    </template>
    <template #append-inner v-if="$slots['append-inner']">
      <slot name="append-inner"></slot>
    </template>
    <template #prepend v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </template>
    <template #prepend-inner v-if="$slots['prepend-inner']">
      <slot name="prepend-inner"></slot>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
defineSlots<{
  append(props: Record<string, unknown>): unknown
  'append-inner'(props: Record<string, unknown>): unknown
  prepend(props: Record<string, unknown>): unknown
  'prepend-inner'(props: Record<string, unknown>): unknown
}>()

const inputValue = defineModel()

type Emits = {
  blur: [event: Event]
  change: [event: Event]
}
const emit = defineEmits<Emits>()
</script>
