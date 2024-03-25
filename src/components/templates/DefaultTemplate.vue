<template>
  <HeaderOrganism></HeaderOrganism>
  <v-main>
    <slot name="body"></slot>
  </v-main>
  <v-footer></v-footer>
</template>

<script setup lang="ts">
import HeaderOrganism from '@/components/organisms/header/HeaderOrganism.vue';
</script>
