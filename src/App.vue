<script setup lang="ts">
import { RouterView } from 'vue-router'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HeaderOrganism from '@/components/organisms/header/HeaderOrganism.vue'

const route = useRoute()

watch(route, () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<template>
  <v-app>
    <HeaderOrganism></HeaderOrganism>
    <Suspense>
      <RouterView />
    </Suspense>
  </v-app>
</template>
