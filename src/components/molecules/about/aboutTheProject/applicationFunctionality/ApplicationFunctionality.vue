<template>
  <RowAtom justify="center" no-gutters class="m-applicationFunctionality">
    <ColAtom
      cols="12"
      md="6"
      class="m-applicationFunctionality__featureBox d-flex flex-column mt-md-9"
      :class="{ '-border': featureHeader }"
    >
      <AnimateText
        v-if="featureHeader"
        :restart="restartHeader"
        :text="$t(`about.aboutProject.applicationFunctionality.headers.${featureHeader}`)"
        :duration="1"
        :stagger="0.1"
        class="m-applicationFunctionality__featureBoxHeader pt-3 px-3"
      >
      </AnimateText>
      <AnimateText
        v-if="featureDescription"
        :restart="restartDescription"
        :text="$t(`about.aboutProject.applicationFunctionality.descriptions.${featureDescription}`)"
        :duration="1"
        :stagger="0.1"
        class="pb-3 px-3"
      >
      </AnimateText>
    </ColAtom>
    <ColAtom cols="12" class="d-flex flex-column justify-end">
      <ComputerComponent class="my-3" @activeFeature="changeFeature" />
    </ColAtom>
  </RowAtom>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'
import Flip from 'gsap/Flip'

import RowAtom from '@/components/atoms/row/RowAtom.vue'
import ColAtom from '@/components/atoms/col/ColAtom.vue'
import ComputerComponent from '@/components/molecules/about/aboutTheProject/applicationFunctionality/computerComponent/ComputerComponent.vue'
import AnimateText from '@/components/atoms/about/animateText/AnimateText.vue'

const featureHeader = ref()
const featureDescription = ref()
const restartHeader = ref(false)
const restartDescription = ref(false)

const expandFeatureBox = (id: string | null) => {
  restartDescription.value = false
  restartHeader.value = false
  const state = Flip.getState('.m-applicationFunctionality__featureBox')
  featureHeader.value = id
  featureDescription.value = id
  const tl = gsap.timeline()
  Flip.from(state, {
    targets: '.m-applicationFunctionality__featureBoxHeader',
    ease: 'power1.in',
    fade: true,
    onComplete: () => {
      tl.fromTo(
        '.m-applicationFunctionality__featureBox',
        { height: 0 },
        { height: 'auto', opacity: 1, duration: 0.5, ease: 'power1.in' },
        '>'
      ).add(() => {
        restartHeader.value = true
        restartDescription.value = true
      }, '<+0.2')
    }
  })
}
const changeFeature = (id: string | null) => {
  const shouldHideFirst = !!featureHeader.value
  if (shouldHideFirst) {
    const hideTl = gsap.timeline()
    hideTl
      .fromTo(
        '.m-applicationFunctionality__featureBox span',
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.5,
          ease: 'power1.out'
        }
      )
      .to('.m-applicationFunctionality__featureBox', {
        height: 0,
        duration: 0.5,
        ease: 'power1.out',
        onComplete: () => expandFeatureBox(id)
      })
    return
  }
  expandFeatureBox(id)
}
</script>

<style lang="scss">
@use '@/assets/vuetify/settings';
@use 'sass:map';

.m-applicationFunctionality {
  height: 100%;

  @media #{map.get(settings.$display-breakpoints, 'xs')} {
    min-height: 50vh;
  }

  @media #{map.get(settings.$display-breakpoints, 'sm')} {
    min-height: 65vh;
  }

  &__featureBox {
    opacity: 0;

    &.-border {
      border: 1px dashed #6389db;
      backdrop-filter: blur(2px);
      background: rgb(99 137 219 / 5%);
    }

    span {
      font-size: var(--font-size-about-content);
    }

    &Header {
      span {
        font-weight: 600;
      }
    }
  }
}
</style>
