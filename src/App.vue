<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <Suspense>
      <RouterView />
    </Suspense>
  </v-app>
</template>
