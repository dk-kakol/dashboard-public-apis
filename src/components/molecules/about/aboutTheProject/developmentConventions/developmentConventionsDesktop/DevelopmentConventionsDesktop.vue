<template>
  <RowAtom
    justify="center"
    no-gutters
    class="m-developmentConventionsDesktop"
    ref="m-developmentConventionsDesktop"
  >
    <ColAtom cols="9" class="mt-9 mb-3">
      <RowAtom justify="center" no-gutters>
        <ColAtom v-for="(convention, index) in topConventions" :key="index" class="mx-3">
          <div :id="`m-developmentConventionsDesktop__convention${convention.index}`">
            <AnimateText
              :restart="restartConventions[convention.index]"
              :text="convention.name"
              :duration="1"
              :stagger="0.1"
              class="m-developmentConventionsDesktop__conventionName"
            ></AnimateText>
            <div class="w-100"></div>
            <AnimateText
              :restart="restartConventions[convention.index]"
              :text="convention.description"
              :duration="1"
              :stagger="0.1"
              class="m-developmentConventionsDesktop__conventionDescription"
            ></AnimateText>
          </div>
        </ColAtom>
      </RowAtom>
    </ColAtom>
    <ColAtom cols="12" class="m-developmentConventionsDesktop__3DModel">
      <TresCanvas ref="m-developmentConventionsDesktop__canvas">
        <TresDirectionalLight :intensity="2" :position="[0, 0, 3]" cast-shadow />
        <RoundedBox
          v-for="index in itemsNumber"
          :key="`box-${index}`"
          :args="[boxSize, boxSize, boxHeight, 10, 3]"
          :position="[xPosition(index), yPosition(index), 0]"
          :rotation="[0, 0, Math.PI / 4]"
          ref="m-developmentConventionsDesktop__roundedBox"
        >
          <TresMeshToonMaterial :color="cardColor" />
        </RoundedBox>
        <Suspense>
          <template v-for="index in itemsNumber" :key="`text-${index}`">
            <Text3D
              v-if="textHeight[index - 1]"
              :text="index.toString()"
              :font="font"
              :size="3"
              :height="textHeight[index - 1]"
              :bevelEnabled="true"
              :bevelThickness="0.05"
              :bevelSize="0.03"
              :needUpdates="true"
              :center="true"
              :position="[xPosition(index), yPosition(index), boxHeight]"
            >
              <TresMeshStandardMaterial :color="textColor" />
            </Text3D>
          </template>
        </Suspense>
        <TresPerspectiveCamera
          visible
          :position="cameraPosition"
          :look-at="lookAtCameraPosition"
          ref="cameraRef"
        />
      </TresCanvas>
    </ColAtom>
    <ColAtom cols="9" class="mt-3 mb-9">
      <RowAtom justify="center" no-gutters>
        <ColAtom v-for="(convention, index) in bottomConventions" :key="index" class="mx-3">
          <div :id="`m-developmentConventionsDesktop__convention${convention.index}`">
            <AnimateText
              :restart="restartConventions[convention.index]"
              :text="convention.name"
              :duration="1"
              :stagger="0.1"
              class="m-developmentConventionsDesktop__conventionName"
            ></AnimateText>
            <div class="w-100"></div>
            <AnimateText
              :restart="restartConventions[convention.index]"
              :text="convention.description"
              :duration="1"
              :stagger="0.1"
              class="m-developmentConventionsDesktop__conventionDescription"
            ></AnimateText>
          </div>
        </ColAtom>
      </RowAtom>
    </ColAtom>
  </RowAtom>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, shallowRef, watch, onMounted, computed } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Text3D, RoundedBox } from '@tresjs/cientos'
import { PerspectiveCamera } from 'three'
import { gsap } from 'gsap'
import { useElementSize } from '@vueuse/core'
import { useElementVisibility } from '@vueuse/core'
import { useWindowScroll } from '@vueuse/core'
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

const canvasRef = useTemplateRef<HTMLCanvasElement>('m-developmentConventionsDesktop__canvas')

const { width: canvasWidth } = useElementSize(canvasRef)

const boxSize = 10
const boxOffset = 1.5
const boxHeight = 2
const itemsNumber = 6
const boxDiagonal = Math.sqrt(2) * boxSize
const xPosition = (index: number) => {
  const x = index * (boxDiagonal / 2) + (index - 1) * boxOffset
  return x
}
const yPosition = (index: number) => {
  const y = index % 2 === 0 ? -1 * (boxDiagonal / 2 + boxOffset) : 0
  return y
}
const xCameraPosition = (xPosition(itemsNumber) + boxDiagonal) / 2
const cameraPosition: [number, number, number] = [xCameraPosition, -60, 100]
const lookAtCameraPosition = [xCameraPosition, -0.5 * (boxDiagonal / 2 + boxOffset), 0]

// changing fov you could make bigger or smaller the 3d model
const { md, lg, xlAndUp, smAndDown } = useDisplay()
const fov = computed(() => {
  if (md.value) return Math.round(16000 / canvasWidth.value)
  if (lg.value) return Math.round(20000 / canvasWidth.value)
  if (xlAndUp.value) return Math.round(30000 / canvasWidth.value)
  return Math.round(22000 / canvasWidth.value)
})
const cameraRef = shallowRef<PerspectiveCamera | null>()
watch(canvasWidth, () => {
  if (cameraRef.value) {
    cameraRef.value.fov = fov.value
    cameraRef.value.updateProjectionMatrix()
  }
})

const { tm } = useI18n()
const conventions = computed<{ name?: string; description?: string }[]>(() =>
  tm('about.aboutProject.developmentConventions')
)
const conventionsWithIndex = computed(() =>
  conventions.value.map((convention, index) => ({ ...convention, index }))
)
const topConventions = computed(() =>
  conventionsWithIndex.value.filter((_, index) => index % 2 === 0)
)
const bottomConventions = computed(() =>
  conventionsWithIndex.value.filter((_, index) => index % 2 !== 0)
)

const initialHight = 0
const textHeight = ref<number[]>(Array(itemsNumber).fill(initialHight))

const developmentConventionsDesktopRef = useTemplateRef('m-developmentConventionsDesktop')
const componentIsVisible = useElementVisibility(developmentConventionsDesktopRef)
const { directions } = useWindowScroll()
const tl = gsap.timeline({
  paused: true
})
const roundedBoxesRef = useTemplateRef('m-developmentConventionsDesktop__roundedBox')

const initialRestartConventionsValues = () => Array(itemsNumber).fill(false)
const restartConventions = ref(initialRestartConventionsValues())

const createComponentAnimation = () => {
  if (!roundedBoxesRef.value) return
  const boxInstances = roundedBoxesRef.value.map((box) => box?.instance).reverse()
  boxInstances.forEach((box, index) => {
    const initialDelay = index === 0 ? 0.5 : 1.5
    tl.fromTo(
      box.scale,
      {
        x: 0,
        y: 0,
        z: 0
      },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1
      },
      `>${initialDelay}`
    )
      .to(
        textHeight.value,
        {
          [index]: 1.5,
          duration: 0.5,
          ease: 'power2.inOut'
        },
        '>'
      )
      .fromTo(
        `#m-developmentConventionsDesktop__convention${index}`,
        {
          autoAlpha: 0
        },
        {
          autoAlpha: 1,
          duration: 1
        },
        '<'
      )
      .add(() => {
        restartConventions.value[index] = true
      }, '<')
  })
}
onMounted(() => {
  if (smAndDown.value) return
  createComponentAnimation()
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
  watch(componentIsVisible, (value) => {
    if (value && lastScrollBottom.value) {
      initialRestartConventionsValues()
      tl.restart()
    }
  })
})
</script>

<style lang="scss">
@use '@/assets/vuetify/settings';
@use 'sass:map';

.m-developmentConventionsDesktop {
  width: 100vw;
  height: 100%;

  @media #{map.get(settings.$display-breakpoints, 'sm-and-down')} {
    display: none;
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
