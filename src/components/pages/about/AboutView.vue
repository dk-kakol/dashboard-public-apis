<template>
  <DefaultTemplate class="p-aboutView__defaultTemplate">
    <template #body>
      <TitleSection />
      <AboutMe />
      <AboutTheProject />
      <ContentCreation />
      <ContactMe />
      <VerticalNavigation />
    </template>
  </DefaultTemplate>
</template>

<script setup lang="ts">
import DefaultTemplate from '@/components/templates/DefaultTemplate.vue'
import TitleSection from '@/components/organisms/about/titleSection/TitleSection.vue'
import AboutMe from '@/components/organisms/about/aboutMe/AboutMe.vue'
import AboutTheProject from '@/components/organisms/about/aboutTheProject/AboutTheProject.vue'
import ContentCreation from '@/components/organisms/about/contentCreation/ContentCreation.vue'
import ContactMe from '@/components/organisms/about/contactMe/ContactMe.vue'
import VerticalNavigation from '@/components/molecules/about/verticalNavigation/VerticalNavigation.vue'
</script>

<style lang="scss">
.p-aboutView__defaultTemplate {
  .v-container {
    padding-bottom: 0;
  }
}
</style>
