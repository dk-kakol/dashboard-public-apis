<template>
  <RowAtom
    justify="center"
    align="center"
    no-gutters
    class="m-technologyStack"
    ref="m-technologyStack"
  >
    <ColAtom cols="12" md="9" lg="7">
      <RowAtom
        no-gutters
        class="m-technologyStack__highlightedItem mt-md-6"
        v-if="highlightedIndex !== null"
      >
        <ColAtom cols="4" class="m-technologyStack__highlightedItemLogo mr-auto mr-md-6">
          <div class="m-technologyStack__wrapper">
            <component
              :is="gridItems[highlightedIndex].component"
              class="m-technologyStack__highlightedItemCurrentLogo"
            />
            <component
              v-if="leavingIndex !== null"
              :is="gridItems[leavingIndex].component"
              class="m-technologyStack__highlightedItemLeavingLogo"
            />
          </div>
        </ColAtom>
        <ColAtom cols="7" md="" class="m-technologyStack__highlightedItemDescription">
          <div class="m-technologyStack__wrapper">
            <div class="m-technologyStack__highlightedItemCurrentDescription">
              <AnimateText
                v-if="gridItems[highlightedIndex].description"
                :restart="true"
                :text="gridItems[highlightedIndex].description"
                :duration="1"
                :y="0"
                :stagger="0.1"
              ></AnimateText>
            </div>
            <div
              class="m-technologyStack__highlightedItemLeavingDescription"
              v-if="leavingIndex !== null"
            >
              {{ gridItems[leavingIndex].description }}
            </div>
          </div>
        </ColAtom>
      </RowAtom>
    </ColAtom>
    <ColAtom cols="12" md="9" class="mt-6">
      <div class="m-technologyStack__gridContainer">
        <div
          v-for="(item, index) in gridItems"
          :key="index"
          class="m-technologyStack__gridItem"
          :class="{ '-highlighted': highlightedIndex === index }"
          @click="handleClick(index)"
        >
          <component :is="item.component" class="m-technologyStack__gridItemImage" />
        </div>
      </div>
    </ColAtom>
  </RowAtom>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import Flip from 'gsap/Flip'
import { ref, nextTick, computed, watch, useTemplateRef, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useElementVisibility } from '@vueuse/core'
import { useWindowScroll } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import RowAtom from '@/components/atoms/row/RowAtom.vue'
import ColAtom from '@/components/atoms/col/ColAtom.vue'
import AnimateText from '@/components/atoms/about/animateText/AnimateText.vue'

import VueSvg from '@/assets/svg/technologyStack/VueSvg.svg'
import VueMobileSvg from '@/assets/svg/technologyStack/VueMobileSvg.svg'
import VueRouterSvg from '@/assets/svg/technologyStack/VueRouterSvg.svg'
import VueRouterMobileSvg from '@/assets/svg/technologyStack/VueRouterMobileSvg.svg'
import PiniaSvg from '@/assets/svg/technologyStack/PiniaSvg.svg'
import PiniaMobileSvg from '@/assets/svg/technologyStack/PiniaMobileSvg.svg'
import AxiosSvg from '@/assets/svg/technologyStack/AxiosSvg.svg'
import AxiosMobileSvg from '@/assets/svg/technologyStack/AxiosMobileSvg.svg'
import VeeValidateSvg from '@/assets/svg/technologyStack/VeeValidateSvg.svg'
import VeeValidateMobileSvg from '@/assets/svg/technologyStack/VeeValidateMobileSvg.svg'
import ZodSvg from '@/assets/svg/technologyStack/ZodSvg.svg'
import ZodMobileSvg from '@/assets/svg/technologyStack/ZodMobileSvg.svg'
import VuetifySvg from '@/assets/svg/technologyStack/VuetifySvg.svg'
import VuetifyMobileSvg from '@/assets/svg/technologyStack/VuetifyMobileSvg.svg'
import ViteSvg from '@/assets/svg/technologyStack/ViteSvg.svg'
import ViteMobileSvg from '@/assets/svg/technologyStack/ViteMobileSvg.svg'
import VueI18nSvg from '@/assets/svg/technologyStack/VueI18nSvg.svg'
import VueI18nMobileSvg from '@/assets/svg/technologyStack/VueI18nMobileSvg.svg'
import StorybookSvg from '@/assets/svg/technologyStack/StorybookSvg.svg'
import StorybookMobileSvg from '@/assets/svg/technologyStack/StorybookMobileSvg.svg'
import GsapSvg from '@/assets/svg/technologyStack/GsapSvg.svg'
import GsapMobileSvg from '@/assets/svg/technologyStack/GsapMobileSvg.svg'
import VueUseSvg from '@/assets/svg/technologyStack/VueUseSvg.svg'
import VueUseMobileSvg from '@/assets/svg/technologyStack/VueUseMobileSvg.svg'
import VitestSvg from '@/assets/svg/technologyStack/VitestSvg.svg'
import VitestMobileSvg from '@/assets/svg/technologyStack/VitestMobileSvg.svg'
import CypressSvg from '@/assets/svg/technologyStack/CypressSvg.svg'
import CypressMobileSvg from '@/assets/svg/technologyStack/CypressMobileSvg.svg'
import TresJsSvg from '@/assets/svg/technologyStack/TresJsSvg.svg'
import TresJsMobileSvg from '@/assets/svg/technologyStack/TresJsMobileSvg.svg'

const initialHighlightedIndex = 7
const highlightedIndex = ref<number | null>(initialHighlightedIndex)
const leavingIndex = ref<number | null>(null)

const { smAndDown } = useDisplay()
const { t } = useI18n()
const gridItems = computed(() => [
  {
    name: 'Vite',
    component: smAndDown.value ? ViteMobileSvg : ViteSvg,
    description: t('about.aboutProject.technologyStack.Vite')
  },
  {
    name: 'Vue Router',
    component: smAndDown.value ? VueRouterMobileSvg : VueRouterSvg,
    description: t('about.aboutProject.technologyStack.VueRouter')
  },
  {
    name: 'Pinia',
    component: smAndDown.value ? PiniaMobileSvg : PiniaSvg,
    description: t('about.aboutProject.technologyStack.Pinia')
  },
  {
    name: 'Axios',
    component: smAndDown.value ? AxiosMobileSvg : AxiosSvg,
    description: t('about.aboutProject.technologyStack.Axios')
  },
  {
    name: 'VeeValidate',
    component: smAndDown.value ? VeeValidateMobileSvg : VeeValidateSvg,
    description: t('about.aboutProject.technologyStack.VeeValidate')
  },
  {
    name: 'Zod',
    component: smAndDown.value ? ZodMobileSvg : ZodSvg,
    description: t('about.aboutProject.technologyStack.Zod')
  },
  {
    name: 'Vuetify',
    component: smAndDown.value ? VuetifyMobileSvg : VuetifySvg,
    description: t('about.aboutProject.technologyStack.Vuetify')
  },
  {
    name: 'Vue.js',
    component: smAndDown.value ? VueMobileSvg : VueSvg,
    description: t('about.aboutProject.technologyStack.Vue')
  },
  {
    name: 'Vue I18n',
    component: smAndDown.value ? VueI18nMobileSvg : VueI18nSvg,
    description: t('about.aboutProject.technologyStack.VueI18n')
  },
  {
    name: 'Storybook',
    component: smAndDown.value ? StorybookMobileSvg : StorybookSvg,
    description: t('about.aboutProject.technologyStack.Storybook')
  },
  {
    name: 'GSAP',
    component: smAndDown.value ? GsapMobileSvg : GsapSvg,
    description: t('about.aboutProject.technologyStack.GSAP')
  },
  {
    name: 'VueUse',
    component: smAndDown.value ? VueUseMobileSvg : VueUseSvg,
    description: t('about.aboutProject.technologyStack.VueUse')
  },
  {
    name: 'Vitest',
    component: smAndDown.value ? VitestMobileSvg : VitestSvg,
    description: t('about.aboutProject.technologyStack.Vitest')
  },
  {
    name: 'Cypress',
    component: smAndDown.value ? CypressMobileSvg : CypressSvg,
    description: t('about.aboutProject.technologyStack.Cypress')
  },
  {
    name: 'TresJS',
    component: smAndDown.value ? TresJsMobileSvg : TresJsSvg,
    description: t('about.aboutProject.technologyStack.TresJS')
  }
])

const handleClick = async (index: number) => {
  const state = Flip.getState('.m-technologyStack__highlightedItem')
  leavingIndex.value = highlightedIndex.value
  highlightedIndex.value = index
  await nextTick()
  const hightlithedTargets = [
    '.m-technologyStack__highlightedItemCurrentLogo',
    '.m-technologyStack__highlightedItemCurrentDescription'
  ]
  const leavingTargets = [
    '.m-technologyStack__highlightedItemLeavingLogo',
    '.m-technologyStack__highlightedItemLeavingDescription'
  ]
  Flip.to(state, {
    targets: hightlithedTargets,
    duration: 2,
    ease: 'power1.inOut',
    absolute: true,
    onEnter: () => {
      const tl = gsap.timeline()
      tl.fromTo(leavingTargets, { yPercent: 0 }, { yPercent: 100, duration: 1 }, 0).fromTo(
        hightlithedTargets,
        { yPercent: -100 },
        { yPercent: 0, duration: 1 },
        '<'
      )
    }
  })
}

const technologyStackRef = useTemplateRef('m-technologyStack')
const technologyStackIsVisible = useElementVisibility(technologyStackRef)
const { directions } = useWindowScroll()
const tl = gsap.timeline({
  paused: true
})
const createInitialComponentAnimation = () => {
  tl.fromTo(
    '.m-technologyStack__gridItem',
    {
      scale: 0.01
    },
    {
      scale: 1,
      stagger: {
        each: 0.3,
        from: 'center',
        grid: 'auto',
        ease: 'power1.in'
      },
      duration: smAndDown.value ? 2 : 3,
      delay: 0.5
    }
  ).fromTo(
    '.m-technologyStack__highlightedItem',
    { autoAlpha: 0 },
    {
      autoAlpha: 1,
      duration: 3,
      ease: 'power1.in',
      onComplete: () => {
        gsap.set('.m-technologyStack__gridItem', { clearProps: 'all' })
        gsap.set('.m-technologyStack__highlightedItem', { clearProps: 'all' })
      }
    },
    '>-3'
  )
}
onMounted(() => {
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
  watch(technologyStackIsVisible, (value) => {
    if (value && (smAndDown.value || lastScrollBottom.value)) {
      tl.restart()
    }
  })
  createInitialComponentAnimation()
})
</script>

<style scoped lang="scss">
@use '@/assets/vuetify/settings';
@use 'sass:map';

.m-technologyStack {
  height: 100%;

  &__gridContainer {
    height: 100%;
    display: grid;
    grid-auto-rows: 50px;
    grid-template-columns: repeat(3, 1fr);

    @media #{map.get(settings.$display-breakpoints, 'sm-and-up')} {
      grid-auto-rows: 100px;
      grid-template-columns: repeat(3, 1fr);
    }

    @media #{map.get(settings.$display-breakpoints, 'md-and-up')} {
      grid-template-columns: repeat(5, 1fr);
    }

    gap: 1rem;
    position: relative;
  }

  &__gridItem {
    background-color: #fff;
    border: 2px solid #e3e3e3;
    text-align: center;
    cursor: pointer;
    transition:
      transform 0.3s,
      border-color 0.3s;

    &.-highlighted {
      transform: scale(1.05);
      border-color: #ec6aa0;

      &::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 104%;
        height: 105%;
        filter: blur(6px);
        background-color: var(--about-secondary-light-color);
      }
    }

    &:hover {
      transform: scale(1.05);

      &::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 104%;
        height: 105%;
      }
    }

    &Image {
      width: 100%;
      height: 100%;
      background-color: white;
      padding: 0.5rem;

      @media #{map.get(settings.$display-breakpoints, 'md-and-up')} {
        padding: 0;
      }
    }
  }

  &__wrapper {
    overflow: hidden;
    height: 100%;
    width: 100%;
    background: white;
    border: 2px solid #ec6aa0;
  }

  &__highlightedItem {
    &Logo,
    &Description {
      &::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 101%;
        height: 102%;
        filter: blur(5px);
        background-color: var(--about-secondary-light-color);
      }
    }

    &Logo,
    &LeavingLogo,
    &Description,
    &LeavingDescription {
      position: relative;
      background-color: #fff;
      color: rgb(0 0 0 / 87%);
      height: 120px;

      @media #{map.get(settings.$display-breakpoints, 'sm-and-up')} {
        height: 150px;
        font-size: var(--font-size-about-navigation);
      }

      font-size: var(--font-size-about-content);

      svg {
        width: 100%;
        height: 100%;
        padding: 0.5rem;
      }
    }

    &CurrentLogo,
    &LeavingLogo,
    &CurrentDescription,
    &LeavingDescription {
      width: 100%;
      height: 100%;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
}
</style>
