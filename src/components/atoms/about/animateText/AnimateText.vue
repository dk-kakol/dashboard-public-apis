<template>
  <div ref="a-textRef" class="a-animateText">
    <div class="a-animateText__wrapper"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from 'vue'
import gsap from 'gsap'

type Props = {
  restart?: boolean
  duration?: number
  stagger?: number
  y?: number
  text?: string
  yDuration?: number
}
const props = withDefaults(defineProps<Props>(), {
  restart: false,
  duration: 2,
  stagger: 0.2,
  y: 10,
  yDuration: 1
})

const textElementRef = useTemplateRef('a-textRef')
const tl = gsap.timeline({ paused: true })

const getTextWrapper = () => {
  if (!textElementRef.value) return
  return textElementRef.value.querySelector('.a-animateText__wrapper')
}

const splitTextIntoSpans = () => {
  const textContent = props.text ?? ''
  const textArray = textContent?.split(' ').map((word, index, array) => {
    return index < array.length - 1 ? word + ' ' : word
  })
  if (!textArray) return
  const textWrapper = getTextWrapper()
  if (!textWrapper) return { spans: null, textWrapper: null }
  textWrapper.innerHTML = ''
  const wrapper = document.createElement('div')
  textArray.forEach((word: string) => {
    const span = document.createElement('span')
    span.innerHTML = word === ' ' ? '&nbsp;' : word
    wrapper.appendChild(span)
  })
  textWrapper.appendChild(wrapper)
}

const animateText = () => {
  if (!textElementRef.value) return
  const spans = textElementRef.value.querySelectorAll('span')
  const textWrapper = getTextWrapper()
  if (!spans || !textWrapper) return

  gsap.set(spans, { opacity: 0 })
  tl.clear()
  tl.pause()
  tl.to(spans, {
    opacity: 1,
    stagger: props.stagger,
    ease: 'power1.in',
    duration: props.duration
  }).fromTo(
    textWrapper,
    { y: props.y },
    {
      y: 0,
      duration: props.yDuration,
      ease: 'power1.in'
    },
    '<'
  )
  if (props.restart) {
    tl.restart()
  }
}

const splitAndAnimateText = () => {
  splitTextIntoSpans()
  animateText()
}

onMounted(() => {
  splitAndAnimateText()
})

watch(
  () => props.restart,
  () => {
    splitAndAnimateText()
  }
)
watch(
  () => props.text,
  (text) => {
    if (!text) return
    splitAndAnimateText()
  }
)
</script>

<style lang="scss">
.a-animateText {
  display: inline-block;
}
</style>
