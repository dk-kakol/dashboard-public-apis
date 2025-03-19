<template>
  <div class="m-verticalNavigation">
    <RowAtom no-gutters>
      <ColAtom cols="1" class="d-flex flex-column justify-center">
        <RectangleSvg
          v-for="(section, key) in sections"
          :key="key"
          :strokeColor="
            isCurrentSection(section)
              ? 'var(--about-secondary-light-color)'
              : 'var(--about-secondary-color)'
          "
          :strokeWidth="isCurrentSection(section) ? 4 : 1"
          width="20px"
          height="20px"
          class="mb-4"
          @click="scroll(section)"
        />
      </ColAtom>
    </RowAtom>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useAboutScrollToStore } from '@/stores'

import RectangleSvg from '@/components/atoms/about/rectangleSvg/RectangleSvg.vue'
import RowAtom from '@/components/atoms/row/RowAtom.vue'
import ColAtom from '@/components/atoms/col/ColAtom.vue'

const aboutScrollToStore = useAboutScrollToStore()
const { sections } = aboutScrollToStore
type Section = (typeof sections)[number]

const currentSection = ref<Section | null>(sections[0])

function setCurrentSection(section: Section) {
  currentSection.value = section
}

const isCurrentSection = (section: Section) => currentSection.value === section

const scroll = (name: Section) => {
  aboutScrollToStore.scroll(name)
  setCurrentSection(name)
}

const setCurrentSectionWhileScrollingThruSections = () => {
  sections.forEach((section: Section) => {
    ScrollTrigger.create({
      trigger: `#${section}`,
      markers: false,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setCurrentSection(section),
      onEnterBack: () => setCurrentSection(section)
    })
  })
}
const animateVerticalNavigationOnStartScrolling = () => {
  gsap.fromTo(
    '.m-verticalNavigation svg',
    { autoAlpha: 0, x: '-1rem' },
    {
      autoAlpha: 1,
      x: 0,
      duration: 3,
      scrollTrigger: {
        start: 'top'
      }
    }
  )
}
onMounted(() => {
  setCurrentSectionWhileScrollingThruSections()
  animateVerticalNavigationOnStartScrolling()
})
</script>

<style lang="scss">
.m-verticalNavigation {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;

  svg:hover {
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(var(--v-theme-on-background), 0.4);
    transform: scale(1.05);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }
}
</style>
