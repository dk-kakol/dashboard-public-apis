<template>
  <div :id="id" class="a-aboutButton pa-2 ma-3">
    <RectangleSvg class="a-aboutButton__rectangle" :strokeColor="strokeColor" />
    <div class="a-aboutButton__text">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, nextTick } from 'vue'
import gsap from 'gsap'

import RectangleSvg from '@/components/atoms/about/rectangleSvg/RectangleSvg.vue'

type Props = {
  strokeColor?: string
  backgroundColor?: string
  color?: string
  text: string
  restart?: boolean
  id: string
}
const props = defineProps<Props>()

const animate = () => {
  const tl = gsap.timeline()
  tl.pause()
  const svg = document.querySelector<SVGPathElement>(`#${props.id} svg`)
  const rect = document.querySelector<SVGPathElement>(`#${props.id} svg rect`)
  if (!rect) return

  const length = rect.getTotalLength()
  gsap.set(rect, {
    strokeDasharray: length,
    strokeDashoffset: length
  })
  gsap.set(`#${props.id} .a-aboutButton__text`, {
    opacity: 0,
    duration: 2,
    ease: 'power1.in'
  })

  tl.to(svg, { autoAlpha: 1 })
    .to(rect, { strokeDashoffset: 0, duration: 3, ease: 'power3.out' }, '<+0.1')
    .fromTo(
      `#${props.id}`,
      { '--background-color': 'transparent', '--background-opacity': 0 },
      {
        '--background-color': props.backgroundColor,
        '--background-opacity': 1,
        duration: 1,
        ease: 'power1.in'
      },
      '-=2'
    )
    .fromTo(
      `#${props.id} .a-aboutButton__text`,
      { y: 5 },
      { y: 0, opacity: 1, duration: 1, ease: 'power1.in' },
      '<+0.5'
    )
  if (props.restart) {
    tl.restart()
  }
}

const initialAnimationSetup = () => {
  const svg = document.querySelector<SVGPathElement>(`#${props.id} svg`)
  gsap.set(svg, { autoAlpha: 0 })
  gsap.set(`#${props.id} .a-aboutButton__text`, {
    opacity: 0
  })
}
onMounted(async () => {
  await nextTick()
  initialAnimationSetup()
})

watch(
  () => props.restart,
  () => {
    animate()
  }
)
</script>

<style scoped lang="scss">
.a-aboutButton {
  --background-color: rgba(var(--v-theme-background));
  --background-opacity: 0;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--background-color);
    opacity: var(--background-opacity);
  }

  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: var(--font-size-about-navigation);
  color: v-bind(color);

  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(var(--v-theme-on-background), 0.4);
    transform: scale(1.05);
    transition: all 0.3s ease;
  }

  &__rectangle {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
