<template>
  <RowAtom justify="center" align="center" no-gutters class="m-additionalFeatures">
    <ColAtom cols="12" md="9">
      <div class="m-additionalFeatures__timeline" ref="m-additionalFeatures__timeline">
        <div class="m-additionalFeatures__step" v-for="(feature, index) in features" :key="index">
          <div class="m-additionalFeatures__stepContent">
            <div class="m-additionalFeatures__stepContentTitle">
              <AnimateText
                v-if="feature?.title"
                :restart="contentRestartArray[index]"
                :text="feature?.title"
                :duration="1"
                :stagger="0.1"
              ></AnimateText>
            </div>
            <div>
              <AnimateText
                v-if="feature?.description"
                :restart="contentRestartArray[index]"
                :text="feature?.description"
                :duration="1"
                :stagger="0.1"
              ></AnimateText>
            </div>
          </div>
          <div class="m-additionalFeatures__stepSide" v-if="!isLast(index)"></div>
          <div :class="['m-additionalFeatures__stepFront', { '-last': isLast(index) }]"></div>
          <div class="m-additionalFeatures__stepFinalArrow" v-if="isLast(index)"></div>
        </div>
      </div>
    </ColAtom>
  </RowAtom>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, useTemplateRef, watch } from 'vue'
import gsap from 'gsap'
import { useDisplay } from 'vuetify'
import { useElementVisibility } from '@vueuse/core'
import { useWindowScroll } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import RowAtom from '@/components/atoms/row/RowAtom.vue'
import ColAtom from '@/components/atoms/col/ColAtom.vue'
import AnimateText from '@/components/atoms/about/animateText/AnimateText.vue'

const { tm } = useI18n()
const features = computed<{ title?: string; description?: string }[]>(() =>
  tm('about.aboutProject.additionalFeatures')
)
const contentRestartArray = ref(Array(features.value.length).fill(false))

const isLast = (index: number) => features.value.length - 1 === index
const { smAndDown } = useDisplay()
const stepWidth = computed(() => (smAndDown.value ? 70 : 100))
const stepHeight = computed(() => (smAndDown.value ? 40 : 40))
const stepXOffset = computed(() => (smAndDown.value ? 70 : 25))
const stepYOffset = computed(() => (smAndDown.value ? 110 : 80))
const contentLeftOffset = computed(() => stepWidth.value + 5)
const timelineRef = useTemplateRef('m-additionalFeatures__timeline')
const timelineIsVisible = useElementVisibility(timelineRef)
const { directions } = useWindowScroll()

const setStepsPosition = () => {
  const steps = gsap.utils.toArray('.m-additionalFeatures__step')
  gsap.set(steps, {
    x: (index) => index * -1 * stepXOffset.value,
    y: (index) => index * stepYOffset.value,
    zIndex: (index) => steps.length - index
  })
}

const createAdditionalFeaturesTimeline = () => {
  const initialDelay = 0.75
  const frontDuration = (0.5 * 3) / 4
  const sideDuration = 0.75
  const stagger = frontDuration + sideDuration

  const tl = gsap.timeline({
    paused: true
  })
  tl.from('.m-additionalFeatures__stepFront', {
    clipPath: 'polygon(0 0, 0% 0%, 0% 100%, 0% 100%)',
    stagger: stagger,
    duration: frontDuration,
    delay: initialDelay,
    ease: 'none'
  })
    .add(() => {
      contentRestartArray.value.forEach((_, index) => {
        tl.add(
          () => {
            contentRestartArray.value[index] = true
          },
          index * stagger + initialDelay + 0.1
        )
      })
    }, '<')
    .from(
      '.m-additionalFeatures__stepSide',
      {
        '--x1': '100%',
        '--y1': '0%',
        '--x2': '100%',
        '--y2': `${(stepHeight.value / (stepYOffset.value + stepHeight.value)) * 100}%`,
        stagger: stagger,
        duration: sideDuration,
        delay: initialDelay,
        ease: 'none'
      },
      frontDuration
    )
    .from('.m-additionalFeatures__stepFinalArrow', {
      duration: 0.2,
      clipPath: 'polygon(0 0, 0% 0%, 0% 100%, 0% 100%)'
    })

  return tl
}
onMounted(() => {
  setStepsPosition()
  const tl = createAdditionalFeaturesTimeline()

  const lastScrollBottom = ref(false)
  watch(
    () => [directions.bottom, directions.top],
    ([bottom, top]) => {
      if (bottom) {
        lastScrollBottom.value = true
      } else if (top) {
        lastScrollBottom.value = false
      }
    }
  )
  watch(timelineIsVisible, (value) => {
    if (value && (smAndDown.value || lastScrollBottom.value)) {
      contentRestartArray.value = contentRestartArray.value.map(() => false)
      tl.restart()
    }
  })
})
</script>

<style lang="scss">
@use '@/assets/vuetify/settings';
@use 'sass:map';

.m-additionalFeatures {
  height: 100%;

  &__timeline {
    margin-top: v-bind('`${stepYOffset - 0.4 * stepHeight}px`');
    margin-bottom: v-bind('`${-1 * (stepYOffset - 0.4 * stepHeight)}px`');
    display: flex;
    align-items: start;
    justify-content: start;

    @media #{map.get(settings.$display-breakpoints, 'sm-and-up')} {
      justify-content: center;
    }

    height: v-bind('`${features.length * stepYOffset + stepHeight}px`');
  }

  &__step {
    position: relative;

    &Content {
      position: absolute;
      bottom: v-bind('`${0.4 * stepHeight}px`');
      left: v-bind('`${contentLeftOffset}px`');
      z-index: 3;
      width: max-content;
      max-width: 45vw;

      span {
        font-size: var(--font-size-about-content);
      }

      &Title {
        span {
          color: var(--about-secondary-light-color);
          font-weight: 600;
        }
      }
    }

    &Front,
    &Side,
    &FinalArrow {
      margin-top: v-bind('`${stepYOffset}`');
    }

    &Front {
      width: v-bind('`${stepWidth}px`');
      height: v-bind('`${stepHeight}px`');
      background-color: var(--about-secondary-color);
      clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);

      &.-last {
        width: v-bind('`calc(2.5 * ${stepWidth}px)`');
      }
    }

    &Side {
      position: absolute;
      top: 0;
      right: 0;
      width: v-bind('`${stepXOffset}px`');
      height: v-bind('`${stepYOffset + stepHeight}px`');
      background-color: var(--about-complementary-color);

      --x1: 0;
      --y1: v-bind('`${stepYOffset / (stepYOffset + stepHeight) * 100}%`');
      --x2: 0;
      --y2: 100%;
      --y4: v-bind('`${stepHeight}px`');

      clip-path: polygon(100% 0, var(--x1) var(--y1), var(--x2) var(--y2), 100% var(--y4));
    }

    &FinalArrow {
      width: v-bind('`${0.5 * stepWidth}px`');
      height: v-bind('`${stepHeight *2}px`');
      background-color: var(--about-secondary-color);
      position: absolute;
      top: v-bind('`-${0.5 * stepHeight}px`');
      left: 99%;
      clip-path: polygon(0 0, 100% 50%, 100% 50%, 0% 100%);
    }
  }
}
</style>
