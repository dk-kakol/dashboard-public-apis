<template>
  <div class="o-titleSection" :id="sections[0]">
    <div class="o-titleSection__content">
      <div class="o-titleSection__title" ref="o-titleElement__title">
        <div class="o-titleSection__box"></div>
        <div class="o-titleSection__svgWrapper">
          <DariuszSvg class="o-titleSection__svg" />
          <div class="mt-n3">
            <AnimateText
              :restart="animateTitleText"
              class="o-titleSection__titleText"
              :text="$t('about.titleSection.title')"
            >
            </AnimateText>
          </div>
        </div>
      </div>
      <div class="o-titleSection__subheaderWithButtons">
        <div class="o-titleSection__subheaderWrapper my-16 my-md-3">
          <AnimateText
            :restart="animateFirstSubheader"
            :y="0"
            class="o-titleSection__subheader"
            :text="$t('about.titleSection.subheader.beforeSpan')"
          >
          </AnimateText>
          <span id="visually"></span>
          <AnimateText
            :restart="animateSecondSubheader"
            :y="0"
            class="o-titleSection__subheader"
            :text="$t('about.titleSection.subheader.afterSpan')"
          >
          </AnimateText>
        </div>
        <RowAtom justify="center" justify-sm="space-between" class="mb-9">
          <ColAtom cols="12" md="" v-for="(button, index) in buttons" :key="index" class="pa-0">
            <AboutButton
              :id="button.id"
              :text="button.text"
              :strokeColor="button?.strokeColor"
              :color="button?.color"
              :backgroundColor="button?.backgroundColor"
              :restart="buttonsAnimationRestart[index]"
              :key="button.id"
              @click="aboutScrollToStore.scroll(button.link)"
            />
          </ColAtom>
        </RowAtom>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, useTemplateRef, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import gsap from 'gsap'
import { useTheme, useDisplay } from 'vuetify'
import { useElementBounding } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import RowAtom from '@/components/atoms/row/RowAtom.vue'
import ColAtom from '@/components/atoms/col/ColAtom.vue'
import AboutButton from '@/components/atoms/about/aboutButton/AboutButton.vue'
import AnimateText from '@/components/atoms/about/animateText/AnimateText.vue'
import DariuszSvg from '@/assets/svg/DariuszSvg.svg'

import { useHeaderStore } from '@/stores'
import { useAboutScrollToStore } from '@/stores'

const { mdAndUp } = useDisplay()

const { t } = useI18n()
const theme = useTheme()
const onBackgroundColor = computed(() => theme.global.current.value.colors['on-background'])
const backgroundColor = computed(() => theme.global.current.value.colors['background'])

const headerStore = useHeaderStore()
const { viewportHeightWithoutHeaderAndPadding } = storeToRefs(headerStore)

const aboutScrollToStore = useAboutScrollToStore()
const { sections } = aboutScrollToStore

const buttons = computed(() => [
  {
    id: 'about',
    text: t('about.titleSection.navigation.aboutMe'),
    link: sections[1]
  },
  {
    id: 'projects',
    text: t('about.titleSection.navigation.projects'),
    link: sections[2]
  },
  {
    id: 'process',
    text: t('about.titleSection.navigation.process'),
    link: sections[3]
  },
  {
    id: 'contact',
    text: t('about.titleSection.navigation.contact'),
    link: sections[4],
    color: 'rgba(var(--v-theme-on-primary))',
    backgroundColor: 'var(--about-primary-color)',
    strokeColor: 'var(--about-primary-color)'
  }
])

const spanText = computed(() => t('about.titleSection.subheader.spanText'))

const titleElementRef = useTemplateRef('o-titleElement__title')
const { width: titleElementWidth } = useElementBounding(titleElementRef)
const titleElementHalfWidth = computed(() => titleElementWidth.value * 0.5)

const animateFirstSubheader = ref(false)
const animateSecondSubheader = ref(false)
const animateTitleText = ref(false)
const buttonsAnimationRestart = ref(Array(buttons.value.length).fill(false))
const boxSize = computed(() =>
  mdAndUp.value
    ? titleElementHalfWidth.value - headerStore.V_CONTAINER_PADDING
    : titleElementHalfWidth.value
)

const animateButtons = () => {
  const timeline = gsap.timeline()
  buttonsAnimationRestart.value.forEach((_, index) => {
    timeline.add(() => {
      buttonsAnimationRestart.value[index] = true
    }, '<+=0.5') // Stagger by 0.5 seconds
  })
}

const animateSvg = () => {
  const paths = document.querySelectorAll<SVGPathElement>('.o-titleSection__svg path')
  paths.forEach((path, index) => {
    const length = path.getTotalLength()

    gsap.set(path, {
      stroke: backgroundColor.value,
      strokeDasharray: length,
      strokeDashoffset: length
    })

    gsap.to(path, {
      stroke: onBackgroundColor.value,
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power1.out',
      delay: index * 0.3
    })
  })

  gsap.to('.o-titleSection__svg', {
    fill: 'rgba(var(--v-theme-on-background)',
    duration: 0.5,
    delay: paths.length * 0.4,
    ease: 'power1.in'
  })
}

const initialAnimationSetup = () => {
  gsap.set(['.o-titleSection__svg'], {
    autoAlpha: 0
  })
  gsap.set('.o-titleSection__box', {
    right: '50%',
    top: '50%',
    xPercent: 50,
    yPercent: -50,
    height: '1px',
    width: '1px'
  })
}

const tl = gsap.timeline()
const mainAnimation = () => {
  tl.to('.o-titleSection__box', {
    height: boxSize.value,
    width: boxSize.value,
    duration: 2,
    ease: 'power1.in'
  })
    .to(
      '.o-titleSection__box',
      {
        right: 0,
        xPercent: 0,
        duration: 1.9,
        ease: 'power4.in'
      },
      '=-1.9'
    )
    .fromTo(
      '.o-titleSection__subheaderWithButtons',
      { height: 0 },
      { height: 'auto', duration: 1.9, ease: 'power4.in' },
      '<'
    )
    .to('.o-titleSection__svg', { autoAlpha: 1 })
    .add(animateSvg, '=-1')
    .add(animateButtons)
    .add(() => {
      animateTitleText.value = true
    }, '>+4.5')
    .fromTo('.o-titleSection__subheader', { y: 5 }, { y: 0, duration: 0.5, ease: 'power1.in' }, '<')
    .add(() => {
      animateFirstSubheader.value = true
    }, '<')
    .add(() => {
      animateSecondSubheader.value = true
    }, '<+0.2')
    .to('#visually', { text: spanText.value, duration: 0.4 }, '<2.5')
}

const animateOnLeaveBack = () => {
  const onLeaveBackTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.o-titleSection__titleText',
      start: 'bottom top',
      onEnter: () => {
        onLeaveBackTl.pause()
        onLeaveBackTl.progress(0)
      },
      onLeaveBack: () => {
        if (tl.isActive()) return
        onLeaveBackTl.restart()
      }
    }
  })
  onLeaveBackTl
    .to(animateTitleText, { value: false, duration: 0 })
    .to(animateTitleText, { value: true, ease: 'power2.in' }, '>+0.1')
}

onMounted(() => {
  initialAnimationSetup()
  mainAnimation()
  animateOnLeaveBack()
})

watch(
  () => theme.global.current.value,
  () => {
    gsap.to('.o-titleSection__svg path', {
      stroke: onBackgroundColor.value,
      duration: 0.5,
      ease: 'power1.in'
    })
  }
)
watch(spanText, () => {
  gsap.fromTo(
    '#visually',
    { text: '', opacity: 0 },
    { text: spanText.value, opacity: 1, duration: 0.4, delay: 2 }
  )
})
</script>

<style lang="scss">
@use '@/assets/vuetify/settings';
@use 'sass:map';

.o-titleSection {
  height: v-bind(viewportHeightWithoutHeaderAndPadding);
  margin-left: auto;
  margin-right: auto;

  --title-section-padding: calc(2 * 16px + 15px);

  @media #{map.get(settings.$display-breakpoints, 'xs')} {
    width: 261px;
  }

  @media #{map.get(settings.$display-breakpoints, 'sm')} {
    width: calc(map.get(settings.$grid-breakpoints, 'sm') - var(--title-section-padding));
  }

  @media #{map.get(settings.$display-breakpoints, 'md-and-up')} {
    width: calc(map.get(settings.$grid-breakpoints, 'md') - var(--title-section-padding));
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: end;
    height: 100%;
  }

  &__title {
    flex: 1;
    position: relative;
  }

  &__svg {
    &Wrapper {
      position: absolute;
      width: 89.3%;

      @media #{map.get(settings.$display-breakpoints, 'sm')} {
        width: 86.6%;
      }

      @media #{map.get(settings.$display-breakpoints, 'xs')} {
        width: 87.3%;
      }

      top: 50%;
      transform: translateY(-50%);
    }

    margin-left: -2px;
    width: 100%;
    height: 100%;
    transition: fill 1s;
  }

  &__titleText {
    font-size: var(--font-size-about-subheader);

    @media #{map.get(settings.$display-breakpoints, 'sm')} {
      font-size: var(--font-size-about-navigation);
    }

    @media #{map.get(settings.$display-breakpoints, 'xs')} {
      font-size: var(--font-size-about-navigation);
    }

    span {
      font-weight: 600;
    }

    letter-spacing: 0.03em;
    overflow: hidden;
  }

  &__box {
    --box-before-opacity: 0;

    position: absolute;
    top: 50%;
    right: 0;

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      filter: blur(18px);
      background-color: v-bind(onBackgroundColor);
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: v-bind(backgroundColor);
    }
  }

  &__subheaderWrapper {
    @media #{map.get(settings.$display-breakpoints, 'xs')} {
      height: 96px;
    }

    @media #{map.get(settings.$display-breakpoints, 'sm')} {
      height: 116px;
    }

    span {
      font-size: var(--font-size-about-subheader);
      font-weight: 600;
      letter-spacing: 0.03em;
    }

    text-align: center;

    #visually {
      background: linear-gradient(
        to right,
        var(--about-secondary-light-color) 0%,
        var(--about-primary-color) 100%
      );
      font-weight: 600;
      background-clip: text;
      -webkit-text-fill-color: transparent;

      @media #{map.get(settings.$display-breakpoints, 'sm-and-down')} {
        display: block;
        width: max-content;
        margin-right: auto;
        margin-left: auto;
      }
    }
  }
}
</style>
