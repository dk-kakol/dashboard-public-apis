<template>
  <div ref="m-aboutMeInfo" class="m-aboutMeInfo">
    <AnimateText
      v-for="(text, index) in $tm('about.aboutMe.info')"
      :restart="infoRestart[index]"
      :text="text"
      :key="index"
      :duration="duration"
      :stagger="stagger"
      class="m-aboutMeInfo__text mb-3"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTemplateRef, onMounted, computed, ref } from 'vue'
import gsap from 'gsap'

import AnimateText from '@/components/atoms/about/animateText/AnimateText.vue'

const { tm } = useI18n()

const aboutMeInfoRef = useTemplateRef('m-aboutMeInfo')
const infoArray = computed<string[]>(() => tm('about.aboutMe.info'))
const infoRestart = ref(Array(infoArray.value.length).fill(false))

const stagger = 0.02
const duration = 1.5
const animateText = () => {
  if (!aboutMeInfoRef.value) return
  const sections = aboutMeInfoRef.value?.querySelectorAll('.m-aboutMeInfo__text')
  if (!sections) return
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sections[0],
      start: 'bottom bottom',
      end: 'bottom top'
    }
  })
  let nextAnimationOffset = 0
  sections.forEach((section, index) => {
    tl.add(() => {
      infoRestart.value[index] = true
    }, `>${nextAnimationOffset}`)
    nextAnimationOffset = section.querySelectorAll('span').length * stagger + duration
  })
}

onMounted(() => {
  animateText()
})
</script>

<style lang="scss">
.m-aboutMeInfo {
  &__text {
    box-sizing: border-box;
    max-width: 100%;
    text-align: justify;

    span {
      font-size: var(--font-size-about-content);
    }
  }
}
</style>
