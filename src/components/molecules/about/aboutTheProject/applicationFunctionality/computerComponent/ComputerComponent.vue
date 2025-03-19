<template>
  <component
    :is="smAndDown ? MobileSvg : ComputerSvg"
    ref="m-computerComponent"
    class="m-computerComponent pb-6"
  />
</template>

<script setup lang="ts">
import { useTemplateRef, onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { useDisplay } from 'vuetify'

import ComputerSvg from '@/assets/svg/ComputerSvg.svg'
import MobileSvg from '@/assets/svg/MobileSvg.svg'

import type { ComponentPublicInstance } from 'vue'

const { smAndDown } = useDisplay()
const computerComponentRef = useTemplateRef<ComponentPublicInstance>('m-computerComponent')
const getButtons = () => {
  if (!computerComponentRef.value) return
  const buttons: SVGGElement[] = computerComponentRef.value?.$el.querySelectorAll('.featureButton')
  return buttons
}

const addClickListenerToButtons = () => {
  const buttons = getButtons()
  if (!buttons) return
  buttons.forEach((button) => {
    const id = button.getAttribute('id')
    button.addEventListener('click', () => clickButton(id ?? ''))
  })
}
const removeClickListenerFromButtons = () => {
  const buttons = getButtons()
  if (!buttons) return
  buttons.forEach((button) => {
    const id = button.getAttribute('id')
    button.removeEventListener('click', () => clickButton(id ?? ''))
  })
}

const activeButton = ref()

const emit = defineEmits<{
  activeFeature: [value: string | null]
}>()

const clickButton = (id: string) => {
  emit('activeFeature', id)
  const clickButtonTl = gsap.timeline()
  if (activeButton.value) {
    clickButtonTl
      .to(`#${activeButton.value}Rectangle`, { autoAlpha: 0, duration: 1, ease: 'power2.out' }, 0)
      .to(`#${activeButton.value}`, { autoAlpha: 1, duration: 1, ease: 'power2.in' }, '<')
  }
  clickButtonTl
    .to(`#${id}`, { autoAlpha: 0, duration: 1, ease: 'power2.out' }, '<')
    .to(`#${id}Rectangle`, { autoAlpha: 1, duration: 1, ease: 'power2.in' }, '<')
  activeButton.value = id
}
const getFeatureRectangles = () => {
  if (!computerComponentRef.value) return
  const rectangles: SVGGElement[] =
    computerComponentRef.value?.$el.querySelectorAll('.featureRectangle')
  return rectangles
}

const onMountedComputerComponentAnimation = () => {
  const buttons = getButtons()
  const featureRectangles = getFeatureRectangles()
  const blackScreen = computerComponentRef.value?.$el.querySelector('#blackScreen')
  const elementsToAnimateExists = buttons && featureRectangles && blackScreen
  if (!elementsToAnimateExists) return
  gsap.set(featureRectangles, { autoAlpha: 0 })
  gsap.set(buttons, { autoAlpha: 0 })
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.m-computerComponent',
      start: 'top bottom+=100',
      markers: false,
      onEnter: () => {
        tl.restart()
      },
      onLeaveBack: () => {
        activeButton.value = null
        gsap.set(featureRectangles, { autoAlpha: 0 })
        gsap.set(buttons, { autoAlpha: 0 })
        emit('activeFeature', null)
      }
    }
  })
  tl.to(blackScreen, { filter: 'brightness(1)', duration: 2, ease: 'power2.in', delay: 1 })
    .to(buttons, { autoAlpha: 1, stagger: 0.2, duration: 1, ease: 'power2.in' }, '>')
    .to(
      buttons,
      {
        '--first-stroke-radius': 0,
        '--first-stroke-opacity': 1,
        duration: 1,
        ease: 'circ.in',
        stagger: {
          each: 0.2,
          repeat: -1,
          yoyo: true
        }
      },
      '<'
    )
    .to(
      buttons,
      {
        '--second-stroke-radius': 0,
        '--second-stroke-opacity': 1,
        duration: 1,
        ease: 'circ.in',
        stagger: {
          each: 0.2,
          repeat: -1,
          yoyo: true
        }
      },
      '<+0.3'
    )
    .add(() => {
      clickButton('ApiData')
    }, '<+2.5')
}

onMounted(() => {
  addClickListenerToButtons()
  onMountedComputerComponentAnimation()
})

onBeforeUnmount(() => {
  removeClickListenerFromButtons()
})
</script>

<style lang="scss">
@use '@/assets/vuetify/settings';
@use 'sass:map';

.m-computerComponent {
  @media #{map.get(settings.$display-breakpoints, 'xs')} {
    max-height: 65vh;
  }

  @media #{map.get(settings.$display-breakpoints, 'sm')} {
    max-height: 50vh;
  }

  .featureButton {
    --first-stroke-radius: 52;
    --first-stroke-opacity: 0.15;
    --second-stroke-radius: 46;
    --second-stroke-opacity: 0.3;

    cursor: pointer;

    .firstStroke {
      r: calc(var(--first-stroke-radius) * 1px);
      opacity: var(--first-stroke-opacity);
    }

    .secondStroke {
      r: calc(var(--second-stroke-radius) * 1px);
      opacity: var(--second-stroke-opacity);
    }
  }
}
</style>
