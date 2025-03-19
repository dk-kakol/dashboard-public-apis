<template>
  <div class="m-developmentConventions">
    <DevelopmentConventionsDesktop v-if="!smAndDown" />
    <DevelopmentConventionsMobile v-else />
  </div>
</template>

<script setup lang="ts">
import DevelopmentConventionsDesktop from '@/components/molecules/about/aboutTheProject/developmentConventions/developmentConventionsDesktop/DevelopmentConventionsDesktop.vue'
import DevelopmentConventionsMobile from '@/components/molecules/about/aboutTheProject/developmentConventions/developmentConventionsMobile/DevelopmentConventionsMobile.vue'
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()
</script>

<style lang="scss">
@use '@/assets/vuetify/settings';
@use 'sass:map';

.m-developmentConventions {
  @media #{map.get(settings.$display-breakpoints, 'md-and-up')} {
    width: 100vw;
  }

  height: 100%;
}
</style>
