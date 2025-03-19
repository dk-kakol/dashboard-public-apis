<template>
  <RowAtom justify="center" class="o-contentCreation" no-gutters :id="sections[3]">
    <ColAtom cols="10">
      <RowAtom no-gutters>
        <ColAtom cols="12">
          <SectionHeader :title="$t('about.titleSection.navigation.process')" />
        </ColAtom>
        <ColAtom cols="12">
          <AnimateText
            :restart="animateIntroduction"
            :text="$t('about.contentCreation.introduction')"
            :duration="techniquesDuration"
            :stagger="techniquesStagger"
            class="o-contentCreation__introduction mb-3"
          />
        </ColAtom>
        <ColAtom
          cols="4"
          class="o-contentCreation__techniqueNumber"
          ref="o-contentCreation__techniqueNumber"
        >
          <div
            class="o-contentCreation__techniqueNumberWrapper"
            ref="o-contentCreation__techniqueNumberWrapper"
          >
            <AnimateText
              :restart="animateTechniqueNumberText"
              :y="0"
              :text="techniqueNumberText"
              :duration="techniquesDuration"
              :stagger="techniquesStagger"
              class="o-contentCreation__techniqueNumberText"
            />
            <div class="o-contentCreation__techniqueNumber0 ml-1 ml-md-2">{{ ' 0' }}</div>
            <div class="o-contentCreation__techniqueNumberIndex mr-3 mr-md-4">
              <div class="o-contentCreation__techniqueNumberIndexFirst">{{ firstNumber }}</div>
              <div class="o-contentCreation__techniqueNumberIndexSecond" v-if="secondNumber">
                {{ secondNumber }}
              </div>
            </div>
            <div class="o-contentCreation__techniqueNumberHyphen"></div>
          </div>
        </ColAtom>
        <v-spacer></v-spacer>
        <ColAtom cols="8" class="pl-md-3 mt-6 mt-md-0" ref="o-contentCreation__techniquesSteps">
          <div
            v-for="(text, index) in techniques"
            :key="index"
            class="o-contentCreation__techniqueStep"
            :class="{ 'pt-9': index !== 0 }"
          >
            <RectangleSvg
              class="o-contentCreation__techniqueStepRectangle mt-2 mr-4"
              :strokeColor="'var(--about-secondary-color)'"
              :strokeWidth="5"
              width="10px"
              height="10px"
            />
            <div class="o-contentCreation__techniqueStepText">
              <AnimateText
                :restart="techniquesRestart[index * 2]"
                :text="text.name"
                :duration="techniquesDuration"
                :stagger="techniquesStagger"
                class="o-contentCreation__techniqueStepTextHeader animatedText mb-3"
              />
              <AnimateText
                :restart="techniquesRestart[index * 2 + 1]"
                :text="text.description"
                :duration="techniquesDuration"
                :stagger="techniquesStagger"
                class="animatedText mb-9"
              />
              <div
                v-if="index !== techniques.length - 1"
                class="o-contentCreation__techniqueStepDivider"
              ></div>
            </div>
          </div>
        </ColAtom>
      </RowAtom>
    </ColAtom>
  </RowAtom>
</template>

<script setup lang="ts">
import { ref, computed, useTemplateRef, onMounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useElementSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'
import gsap from 'gsap'
import Flip from 'gsap/Flip'

import RowAtom from '@/components/atoms/row/RowAtom.vue'
import ColAtom from '@/components/atoms/col/ColAtom.vue'
import SectionHeader from '@/components/molecules/about/sectionHeader/SectionHeader.vue'
import AnimateText from '@/components/atoms/about/animateText/AnimateText.vue'
import RectangleSvg from '@/components/atoms/about/rectangleSvg/RectangleSvg.vue'

import { useHeaderStore } from '@/stores'
import { useAboutScrollToStore } from '@/stores'

const headerStore = useHeaderStore()
const { viewportHeightWithoutHeader } = storeToRefs(headerStore)

const aboutScrollToStore = useAboutScrollToStore()
const { sections } = aboutScrollToStore

const animateIntroduction = ref(false)
const animateTechniqueNumberText = ref(false)
const techniqueNumberRef = useTemplateRef('o-contentCreation__techniqueNumber')
const techniqueNumberWrapperRef = useTemplateRef('o-contentCreation__techniqueNumberWrapper')
const { height: techniqueNumberHeight } = useElementSize(techniqueNumberRef)
const firstNumber = ref(1)
const secondNumber = ref<number | null>(null)

const { tm, t } = useI18n()
const techniques = computed<{ name?: string; description?: string }[]>(() =>
  tm('about.contentCreation.techniques')
)
const techniquesStagger = 0.015
const techniquesDuration = 1
const techniquesRectangleDuration = 0.5
// multiply by 2 because we have two elements to animate for each technique (name & description)
const techniquesRestart = ref(Array(techniques.value.length * 2).fill(false))
const techniquesStepsRef = useTemplateRef('o-contentCreation__techniquesSteps')

const { smAndDown } = useDisplay()
const techniqueNumberText = computed(() =>
  smAndDown.value
    ? t('about.contentCreation.techniqueNumberMobile')
    : t('about.contentCreation.techniqueNumber')
)
const animateIntroductionOnEnterViewport = () => {
  gsap.to('.o-contentCreation__introduction', {
    scrollTrigger: {
      trigger: '.o-contentCreation__introduction',
      start: 'bottom bottom',
      end: 'bottom top',
      onEnter: () => {
        animateIntroduction.value = true
      }
    }
  })
}
const animateTechniqueNumberOnEnterViewport = () => {
  gsap.to('.o-contentCreation__techniqueNumberText', {
    scrollTrigger: {
      trigger: '.o-contentCreation__techniqueNumberText',
      start: 'bottom bottom',
      end: 'bottom top',
      onEnter: () => {
        animateTechniqueNumberText.value = true
        const tl = gsap.timeline()
        tl.to(
          ['.o-contentCreation__techniqueNumber0', '.o-contentCreation__techniqueNumberIndex'],
          {
            opacity: 1,
            duration: 1,
            delay: techniquesDuration,
            stagger: techniquesStagger
          }
        ).to(
          '.o-contentCreation__techniqueNumberHyphen',
          {
            width: smAndDown.value ? '10px' : '20px',
            duration: 1
          },
          '>'
        )
      }
    }
  })
}
const animateTechniquesStepsOnEnterViewport = () => {
  if (!techniquesStepsRef.value?.$el) return
  const techniqueSections: HTMLDivElement[] =
    techniquesStepsRef.value.$el.querySelectorAll('.animatedText')
  const techniquesRectangles: HTMLDivElement[] = techniquesStepsRef.value.$el.querySelectorAll(
    '.o-contentCreation__techniqueStepRectangle'
  )
  const techniqesDivider: HTMLDivElement[] = techniquesStepsRef.value.$el.querySelectorAll(
    '.o-contentCreation__techniqueStepDivider'
  )
  if (!techniqueSections) return
  if (!techniquesRectangles) return
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: techniqueSections[0],
      start: 'bottom bottom',
      end: 'bottom top'
    }
  })
  let nextAnimationOffset = techniquesRectangleDuration
  techniqueSections.forEach((section, index) => {
    if (index % 2 === 0) {
      tl.fromTo(
        techniquesRectangles[index / 2],
        {
          scale: 0.01
        },
        {
          scale: 1,
          duration: techniquesRectangleDuration
        },
        '>'
      )
    }
    tl.add(() => {
      techniquesRestart.value[index] = true
    }, '<')
    nextAnimationOffset =
      section.querySelectorAll('span').length * techniquesStagger + techniquesDuration
    if (index % 2 !== 0 && index !== techniqueSections.length - 1) {
      tl.fromTo(
        techniqesDivider[(index - 1) / 2],
        {
          width: 0
        },
        {
          width: '100%',
          delay: techniquesDuration,
          duration: nextAnimationOffset - techniquesDuration,
          ease: 'power2.inOut'
        },
        '>'
      )
    }
  })
}
const animateTechniqueNumberOnScroll = () => {
  if (!techniqueNumberRef.value?.$el) return
  if (!techniqueNumberWrapperRef.value) return

  gsap.to(techniqueNumberRef.value.$el, {
    scrollTrigger: {
      trigger: techniqueNumberRef.value.$el,
      markers: false,
      start: 'top center',
      end: 'bottom center',
      onUpdate: (self) => {
        const y =
          self.progress *
          (techniqueNumberHeight.value - (techniqueNumberWrapperRef.value?.clientHeight ?? 0))
        gsap.to(techniqueNumberWrapperRef.value, { y: y, ease: 'power1.inOut', duration: 1 })
      }
    }
  })
}
const animationOnStepActive = async (
  techniquesSteps: HTMLDivElement[],
  index: number,
  scrollDown: boolean
) => {
  const tl = gsap.timeline()
  tl.to(techniquesSteps, { opacity: (i) => (i === index ? 1 : 0.5), duration: 0.5 })

  if (index === 0 && scrollDown) return
  if (index === techniquesSteps.length - 1 && !scrollDown) return
  const state = Flip.getState('.o-contentCreation__techniqueNumberWrapper')
  if (scrollDown) {
    firstNumber.value = index
    secondNumber.value = index + 1
  } else {
    firstNumber.value = index + 1
    secondNumber.value = index + 2
  }
  await nextTick()
  Flip.to(state, {
    targets: [
      '.o-contentCreation__techniqueNumberIndexFirst',
      '.o-contentCreation__techniqueNumberIndexSecond'
    ],
    duration: 2,
    ease: 'power1.inOut',
    absolute: true,
    onEnter: (elements) => {
      const tl = gsap.timeline()
      tl.fromTo(
        elements[0],
        { yPercent: scrollDown ? 0 : -100 },
        { yPercent: scrollDown ? -100 : 0, duration: 1 }
      ).fromTo(
        elements[1],
        { yPercent: scrollDown ? 0 : -100 },
        { yPercent: scrollDown ? -100 : 0, duration: 1 },
        '<'
      )
    }
  })
}
const addToTechniquesStepsAnimationOnStepActive = (techniquesSteps: HTMLDivElement[]) => {
  techniquesSteps.forEach((step, index) => {
    gsap.to(step, {
      scrollTrigger: {
        trigger: step,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        markers: false,
        onEnter: () => {
          animationOnStepActive(techniquesSteps, index, true)
        },
        onEnterBack: () => {
          animationOnStepActive(techniquesSteps, index, false)
        }
      }
    })
  })
}
onMounted(() => {
  animateIntroductionOnEnterViewport()
  animateTechniqueNumberOnEnterViewport()
  animateTechniquesStepsOnEnterViewport()
  const techniquesSteps = gsap.utils.toArray<HTMLDivElement>('.o-contentCreation__techniqueStep')
  addToTechniquesStepsAnimationOnStepActive(techniquesSteps)
  animateTechniqueNumberOnScroll()
})
</script>

<style lang="scss">
@use '@/assets/vuetify/settings';
@use 'sass:map';

.o-contentCreation {
  min-height: v-bind(viewportHeightWithoutHeader);

  &__introduction {
    text-align: justify;

    span {
      font-size: var(--font-size-about-content);
    }
  }

  &__techniqueNumber {
    &Wrapper {
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: stretch;

      span {
        font-size: var(--font-size-about-content);
        color: var(--about-secondary-color);
        font-weight: 600;
      }
    }

    &0,
    &Index {
      @media #{map.get(settings.$display-breakpoints, 'sm-and-down')} {
        line-height: 2;
      }

      opacity: 0;
      font-size: var(--font-size-about-content);
      color: var(--about-secondary-color);
      font-weight: 600;
    }

    &IndexFirst,
    &IndexSecond {
      height: 100%;
      font-size: var(--font-size-about-content);
      color: var(--about-secondary-color);
      font-weight: 600;
    }

    &Hyphen {
      width: 0;
      border-bottom: 2px solid var(--about-secondary-color);
      align-self: center;
    }
  }

  &__techniqueStep {
    opacity: 0.5;
    display: flex;
    flex-wrap: wrap;

    &Text {
      flex: 1;

      span {
        font-size: var(--font-size-about-content);
      }
    }

    &TextHeader {
      span {
        color: var(--about-secondary-color);
        font-weight: 600;
      }
    }

    &Divider {
      border-bottom: 1px solid rgba(var(--v-theme-on-background));
    }
  }
}
</style>
