<template>
  <v-autocomplete
    v-bind="$attrs"
    v-model="selectValue"
    data-test="a-autocompleteAtom"
    menuIcon="mdi-menu-down"
  >
    <template #item="{ props, item }" v-if="$slots.item">
      <slot name="item" v-bind="{ props, item }"></slot>
    </template>
    <template #selection="{ item }" v-if="$slots.selection">
      <slot name="selection" v-bind="{ item }"></slot>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
const selectValue = defineModel()
</script>
