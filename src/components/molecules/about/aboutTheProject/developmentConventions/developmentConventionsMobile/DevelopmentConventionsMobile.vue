<template>
  <div class="m-developmentConventionsMobile" ref="m-developmentConventionsMobile">
    <RowAtom
      v-for="(convention, index) in conventions"
      :key="index"
      no-gutters
      class="mb-3 mb-sm-6"
    >
      <ColAtom cols="auto" class="m-developmentConventionsMobile__3DModel mr-3">
        <TresCanvas ref="m-developmentConventionsMobile__canvasMobile">
          <TresDirectionalLight :intensity="2" :position="[0, 0, 1]" cast-shadow />
          <RoundedBox
            :args="[boxSize, boxSize, boxHeight, 10, 3]"
            :position="[0, 0, 0]"
            :rotation="[0, 0, Math.PI / 4]"
            ref="m-developmentConventionsMobile__roundedBox"
          >
            <TresMeshToonMaterial :color="cardColor" />
          </RoundedBox>
          <Suspense>
            <Text3D
              v-if="textHeight"
              :text="(index + 1).toString()"
              :font="font"
              :size="3"
              :height="textHeight"
              :bevelEnabled="true"
              :bevelThickness="0.05"
              :bevelSize="0.03"
              :needUpdates="true"
              :center="true"
              :position="[0, 0, boxHeight]"
            >
              <TresMeshStandardMaterial :color="textColor" />
            </Text3D>
          </Suspense>
          <TresPerspectiveCamera visible :position="[0, -4, 15]" :look-at="[0, 0, 0]" />
        </TresCanvas>
      </ColAtom>
      <ColAtom class="mb-9">
        <div :id="`m-developmentConventionsMobile__convention${index}`">
          <AnimateText
            :restart="restartConventions[index]"
            :text="convention.name"
            :duration="2"
            :stagger="0.1"
            class="m-developmentConventionsMobile__conventionName"
          ></AnimateText>
          <div class="w-100"></div>
          <AnimateText
            :restart="restartConventions[index]"
            :text="convention.description"
            :duration="2"
            :stagger="0.1"
            class="m-developmentConventionsMobile__conventionDescription"
          ></AnimateText>
        </div>
      </ColAtom>
    </RowAtom>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, watch, onMounted, computed } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Text3D, RoundedBox } from '@tresjs/cientos'
import { gsap } from 'gsap'
import { useElementVisibility } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'

import RowAtom from '@/components/atoms/row/RowAtom.vue'
import ColAtom from '@/components/atoms/col/ColAtom.vue'
import AnimateText from '@/components/atoms/about/animateText/AnimateText.vue'

type Props = {
  cardColor?: string
  textColor?: string
}
const props = withDefaults(defineProps<Props>(), {
  cardColor: '#A1486F',
  textColor: '#ffffff'
})

const font = ref<string>('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json')
const cardColor = props.cardColor
const textColor = props.textColor

const boxSize = 10
const boxHeight = 2

const { smAndDown } = useDisplay()

const { tm } = useI18n()
const conventions = computed<{ name?: string; description?: string }[]>(() =>
  tm('about.aboutProject.developmentConventions')
)

const initialHight = 0
const textHeight = ref<number>(initialHight)

const developmentConventionsMobileComponentRef = useTemplateRef('m-developmentConventionsMobile')
const componentIsVisible = useElementVisibility(developmentConventionsMobileComponentRef)
const tl = gsap.timeline({
  paused: true
})

type Box = typeof RoundedBox
const roundedBoxesRef = useTemplateRef<Box[]>('m-developmentConventionsMobile__roundedBox')

const initialRestartConventionsValues = () => Array(conventions.value.length).fill(false)
const restartConventions = ref(initialRestartConventionsValues())

const createComponentAnimation = () => {
  if (!roundedBoxesRef.value) return
  const animationDuration = 2
  roundedBoxesRef.value.forEach((box, index) => {
    if (!box) return
    tl.fromTo(
      box.instance.scale,
      {
        x: 0,
        y: 0,
        z: 0
      },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: animationDuration
      },
      `<`
    )
      .to(
        textHeight,
        {
          value: 2,
          duration: animationDuration,
          ease: 'power2.inOut'
        },
        '<'
      )
      .fromTo(
        `#m-developmentConventionsMobile__convention${index}`,
        {
          autoAlpha: 0
        },
        {
          autoAlpha: 1,
          duration: animationDuration
        },
        '<'
      )
      .add(() => {
        restartConventions.value[index] = true
      }, '<')
  })
}
onMounted(() => {
  if (!smAndDown.value) return
  createComponentAnimation()
  watch(componentIsVisible, (value) => {
    if (value) {
      restartConventions.value = initialRestartConventionsValues()
      tl.restart()
    }
  })
})
</script>

<style lang="scss">
@use '@/assets/vuetify/settings';
@use 'sass:map';

.m-developmentConventionsMobile {
  @media #{map.get(settings.$display-breakpoints, 'md-and-up')} {
    display: none;
  }

  &__3DModel {
    width: 80px;
    height: 80px;
  }

  canvas {
    display: block;
    position: relative;
  }

  &__conventionName {
    span {
      font-weight: 600;
      color: var(--about-secondary-color);
    }
  }

  &__conventionName,
  &__conventionDescription {
    span {
      font-size: var(--font-size-about-content);
    }
  }
}
</style>
