<template>
  <svg
    fill="none"
    :width="width"
    :height="height"
    xmlns="http://www.w3.org/2000/svg"
    ref="a-rectangleSvg"
    class="a-rectangleSvg"
  >
    <rect
      v-if="rectHeight > 0 && rectWidth > 0"
      :x="position"
      :y="position"
      :width="rectWidth"
      :height="rectHeight"
      :stroke-width="strokeWidth"
      :stroke="strokeColor"
    />
    <defs>
      <linearGradient
        id="aboutMeStroke"
        x2="0"
        y2="100%"
        x1="100%"
        y1="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#DB6397" />
        <stop offset="1" stop-color="#4965A1" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { useTemplateRef, computed } from 'vue'

type Props = {
  width?: number | string
  height?: number | string
  strokeWidth?: number
  strokeColor?: string
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
  strokeWidth: 1,
  strokeColor: 'rgba(var(--v-theme-on-background))'
})
const elementRef = useTemplateRef('a-rectangleSvg')
const { height: heightPx, width: widthPx } = useElementSize(elementRef)
const position = computed(() => props.strokeWidth / 2)

const rectWidth = computed(() => Math.floor((widthPx.value - props.strokeWidth) * 10) / 10)
const rectHeight = computed(() => Math.floor((heightPx.value - props.strokeWidth) * 10) / 10)
</script>

<style lang="scss">
.a-rectangleSvg {
  rect {
    transition: stroke 1s;
  }
}
</style>
