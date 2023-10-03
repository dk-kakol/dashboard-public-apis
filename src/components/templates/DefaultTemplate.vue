<template>
  <Header></Header>
  <v-main>
    <slot name="body"></slot>
  </v-main>
  <v-footer></v-footer>
</template>

<script setup lang="ts">
import Header from '@/components/organisms/header/Header.vue';
</script>
