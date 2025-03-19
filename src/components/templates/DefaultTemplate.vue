<template>
  <div>
    <HeaderOrganism></HeaderOrganism>
    <v-main>
      <v-container fluid>
        <slot name="body"></slot>
      </v-container>
    </v-main>
  </div>
</template>

<script setup lang="ts">
import HeaderOrganism from '@/components/organisms/header/HeaderOrganism.vue'
</script>
