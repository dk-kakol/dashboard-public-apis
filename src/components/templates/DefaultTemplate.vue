<template>
  <div>
    <HeaderOrganism></HeaderOrganism>
    <v-main>
      <slot name="body"></slot>
    </v-main>
  </div>
</template>

<script setup lang="ts">
import HeaderOrganism from '@/components/organisms/header/HeaderOrganism.vue';
</script>
