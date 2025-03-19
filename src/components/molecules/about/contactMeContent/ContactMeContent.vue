<template>
  <div class="m-contactContent">
    <div class="m-contactContent__scrollInfo">
      <div class="m-contactContent__scrollInfoText">
        <AnimateText :restart="true" :text="$t('about.contactMe.scroll')" />
      </div>
      <ScrollDownSvg />
    </div>
    <div class="m-contactContent__clipPathed">
      <canvas ref="m-contactContent__canvas" />
      <div class="m-contactContent__blendVideo" />
      <Greeting class="m-contactContent__icon" />
      <RowAtom
        justify="center"
        no-gutters
        justify-sm="space-between"
        class="m-contactContent__buttons pa-12"
      >
        <ColAtom cols="12" sm="" v-for="(button, index) in buttons" :key="index" class="pa-0">
          <a :href="button.link" target="_blank">
            <AboutButton
              :id="button.id"
              :text="button.text"
              :strokeColor="button?.strokeColor"
              :color="button?.color"
              :backgroundColor="button?.backgroundColor"
              :restart="buttonsAnimationRestart[index]"
              :key="button.id"
            />
          </a>
        </ColAtom>
      </RowAtom>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, useTemplateRef } from 'vue'
import gsap from 'gsap'
import { useI18n } from 'vue-i18n'

import RowAtom from '@/components/atoms/row/RowAtom.vue'
import ColAtom from '@/components/atoms/col/ColAtom.vue'
import Greeting from '@/assets/svg/Greeting.svg'
import ScrollDownSvg from '@/assets/svg/ScrollDownSvg.svg'
import AboutButton from '@/components/atoms/about/aboutButton/AboutButton.vue'
import AnimateText from '@/components/atoms/about/animateText/AnimateText.vue'

const { t } = useI18n()
const buttons = computed(() => [
  {
    id: 'Github',
    text: t('about.contactMe.links.github.text'),
    link: t('about.contactMe.links.github.url'),
    color: 'rgba(var(--v-theme-on-primary))',
    backgroundColor: 'var(--about-secondary-color)',
    strokeColor: 'var(--about-secondary-color)'
  },
  {
    id: 'LinkedIn',
    text: t('about.contactMe.links.linkedin.text'),
    link: t('about.contactMe.links.linkedin.url'),
    color: 'rgba(var(--v-theme-on-primary))',
    backgroundColor: 'var(--about-secondary-color)',
    strokeColor: 'var(--about-secondary-color)'
  },
  {
    id: 'email',
    text: t('about.contactMe.links.email.text'),
    link: t('about.contactMe.links.email.url'),
    color: 'rgba(var(--v-theme-on-primary))',
    backgroundColor: 'var(--about-secondary-color)',
    strokeColor: 'var(--about-secondary-color)'
  }
])

const initialButtonsAnimationRestart = (): boolean[] => Array(buttons.value.length).fill(false)
const buttonsAnimationRestart = ref<boolean[]>(initialButtonsAnimationRestart())
const animateButtons = () => {
  const buttonsTimeline = gsap.timeline()
  buttonsAnimationRestart.value.forEach((_, index) => {
    buttonsTimeline.add(() => {
      buttonsAnimationRestart.value[index] = true
    }, '<+0.5') // Stagger by 0.5 seconds
  })
}

const animateArrow = () => {
  const arrowTimeline = gsap.timeline()
  arrowTimeline.fromTo(
    '.m-contactContent__scrollInfo .arrow',
    {
      opacity: 0,
      scale: 0.1,
      transformOrigin: 'center center'
    },
    {
      opacity: 1,
      scale: 1,
      duration: 2,
      delay: 1,
      ease: 'power1.inOut',
      stagger: {
        repeat: -1,
        yoyo: true,
        each: 0.5
      }
    }
  )
}

const contactContentCanvasRef = useTemplateRef<HTMLCanvasElement>('m-contactContent__canvas')
type Frame = {
  frame: number
}
const initCanvas = () => {
  const frameCount: number = 347
  const images: HTMLImageElement[] = []
  const frames: Frame = {
    frame: 0
  }
  if (!contactContentCanvasRef.value) return { frames, frameCount, render }
  const context = contactContentCanvasRef.value.getContext('2d')
  contactContentCanvasRef.value.width = 3840
  contactContentCanvasRef.value.height = 2160

  for (let i = 0; i < frameCount; i++) {
    const img = new Image()
    img.src = new URL(
      `/src/assets/images/contact2converted/${(i + 1).toString().padStart(5, '0')}.webp`,
      import.meta.url
    ).href
    images.push(img)
  }

  images[0].onload = render

  function render() {
    if (!context) return
    if (!contactContentCanvasRef.value) return
    context.clearRect(
      0,
      0,
      contactContentCanvasRef.value.width,
      contactContentCanvasRef.value.height
    )
    context.drawImage(images[frames.frame], 0, 0)
  }

  return { frames, frameCount, render }
}

const mainAnimation = (frames: Frame, frameCount: number, render: gsap.Callback) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.o-contactMe',
      start: 'top top+=64',
      pin: true,
      end: '+=6000',
      scrub: 1.5,
      onEnter: () => {
        buttonsAnimationRestart.value = initialButtonsAnimationRestart()
      }
    }
  })
  tl.to(
    frames,
    {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: render,
      duration: 2
    },
    '0'
  ).fromTo(
    '.m-contactContent__clipPathed',
    { clipPath: 'circle(7%)' },
    { clipPath: 'circle(75%)', duration: 2 },
    '<'
  )
  tl.fromTo(
    '.m-contactContent__icon',
    { scale: 0.15, opacity: 1 },
    { opacity: 0, duration: 1 },
    '0'
  )
  tl.fromTo(
    '.m-contactContent__scrollInfo',
    { scale: 1, opacity: 1 },
    { scale: 0, opacity: 0, duration: 1 },
    '0'
  )
  tl.add(animateButtons, '<+0.4')
}

onMounted(() => {
  const { frames, frameCount, render } = initCanvas()
  mainAnimation(frames, frameCount, render)
  animateArrow()
})
</script>

<style lang="scss">
.m-contactContent {
  height: 100%;
  width: 100%;
  position: relative;

  &__scrollInfo {
    position: absolute;
    bottom: 8%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;

    &Text {
      span {
        font-size: var(--font-size-about-content);
      }
    }

    svg {
      width: 50%;

      path {
        stroke: rgba(var(--v-theme-on-background));
      }
    }
  }

  &__clipPathed {
    height: 100%;
    width: 100%;
    position: relative;
  }

  &__blendVideo {
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.3;
  }

  &__buttons {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-content: end;
  }

  &__icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    fill: var(--about-secondary-color);
  }

  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
