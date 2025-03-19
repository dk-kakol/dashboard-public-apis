<template>
  <div class="m-aboutMeImage">
    <div class="m-aboutMeImage__wrapper">
      <RectangleSvg
        class="m-aboutMeImage__rectangle"
        ref="m-aboutMeImage__rectangle"
        strokeColor="url(#aboutMeStroke)"
        :strokeWidth="2"
      />
      <div class="m-aboutMeImage__image">
        <img :src="pictureSrc" alt="myPicture" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef, watch } from 'vue'
import gsap from 'gsap'
import { useElementSize } from '@vueuse/core'
import { useDisplay } from 'vuetify'

import RectangleSvg from '@/components/atoms/about/rectangleSvg/RectangleSvg.vue'

const pictureSrc = computed(() => new URL('/src/assets/images/myImage.webp', import.meta.url).href)

const { mdAndDown } = useDisplay()
const cssRotateValue = computed(() => (mdAndDown.value ? 10 : 20))

const imageWrapperSelector = '.m-aboutMeImage__wrapper'
const rectangleSelector = '.m-aboutMeImage__rectangle rect'

const rectangleSvgRef = useTemplateRef('m-aboutMeImage__rectangle')
const { width: rectangleSvgWidth, height: rectangleSvgHeight } = useElementSize(rectangleSvgRef)
const rectangleSvgInitialSetup = () => {
  const length = 2 * (rectangleSvgWidth.value + rectangleSvgHeight.value)
  gsap.set(rectangleSelector, {
    strokeDasharray: length,
    strokeDashoffset: length
  })
}

let tl: gsap.core.Timeline
const animateAboutMeImage = () => {
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.m-aboutMeImage',
      start: 'top 80%',
      end: 'bottom top',
      onUpdate: (self) => {
        const rotateValue = `${self.progress * cssRotateValue.value}deg`
        tl.to(imageWrapperSelector, { rotateY: rotateValue }, 0)
      }
    }
  })
  tl.to(rectangleSelector, {
    strokeDashoffset: 0,
    duration: 4,
    ease: 'power1.in'
  })
    .to(imageWrapperSelector, { '--box-shadow': 1, ease: 'power1.in', duration: 4 }, '<')
    .fromTo(
      '.m-aboutMeImage__image',
      { opacity: 0 },
      { opacity: 1, duration: 3, ease: 'power1.in' },
      '<+1'
    )
}

watch(
  [rectangleSvgWidth, rectangleSvgHeight],
  ([newRectWidth, newRectHeight]) => {
    if (newRectWidth && newRectHeight) {
      rectangleSvgInitialSetup()
      animateAboutMeImage()
    }
  },
  { once: true }
)
</script>

<style lang="scss" scoped>
.m-aboutMeImage {
  width: 100%;
  height: 100%;
  position: relative;
  perspective: 1000px;

  --scale: 1;
  --translate: 0;
  --box-shadow: 0px;

  &__wrapper {
    position: relative;
    transform-style: preserve-3d;
    transform: rotateY(0deg);
    transition: all 0.5s ease;
    box-shadow:
      0 calc(8 * var(--box-shadow)) calc(10 * var(--box-shadow))
        rgba(var(--v-theme-on-background), 0.4),
      0 0 calc(40 * var(--box-shadow)) rgba(var(--v-theme-on-background), 0.4);
    width: 100%;
    height: 100%;

    &:hover {
      --scale: 1.05;
      --translate: -20px;
      --box-shadow: 1.5px !important;

      transform: translateZ(100px) translateX(30px) rotateY(5deg) rotateX(0deg);
    }
  }

  &__rectangle {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &__image {
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    scale: var(--scale);
    transition: scale 0.5s ease;
    opacity: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: bottom;
      transform: translateY(var(--translate));
      transition: all 0.5s ease;
    }
  }
}
</style>
