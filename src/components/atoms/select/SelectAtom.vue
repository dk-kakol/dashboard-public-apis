<template>
  <v-select v-bind="$attrs" v-model="selectValue" menuIcon="mdi-menu-down">
    <template #item="{ props, item }" v-if="$slots.item">
      <slot name="item" v-bind="{ props, item }"></slot>
    </template>
    <template #selection="{ item: selectionItem }" v-if="$slots.selection">
      <slot name="selection" v-bind="{ selectionItem }"></slot>
    </template>
  </v-select>
</template>

<script setup lang="ts">
const selectValue = defineModel()
</script>
