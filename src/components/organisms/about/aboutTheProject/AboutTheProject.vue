<template>
  <div class="o-aboutTheProject mb-9" :id="sections[2]">
    <div>
      <RowAtom justify="center" no-gutters>
        <ColAtom cols="10">
          <SectionHeader :title="$t('about.titleSection.navigation.projects')" />
        </ColAtom>
        <ColAtom cols="10" v-if="smAndDown">
          <ExpansionPanels v-model="mobilePanel" multiple>
            <ExpansionPanel
              v-for="(panel, index) in panels"
              :key="`mobile-${index}`"
              class="o-aboutTheProject__mobilePanel"
            >
              <template #title>
                <div class="o-aboutTheProject__mobilePanelTitle">{{ panel.text }}</div>
              </template>
              <template #text>
                <component :is="panel.component" />
              </template>
            </ExpansionPanel>
          </ExpansionPanels>
        </ColAtom>
        <ColAtom cols="10" md="9" lg="7" v-if="!smAndDown">
          <PanelsNavigation
            :panelsButtons="panelsButtons"
            @navigate="navigateToPanelId"
            :currentPanel="currentPanel?.id"
          />
        </ColAtom>
      </RowAtom>
    </div>
    <div class="o-aboutTheProject__desktopPanelContainer mx-n3" v-if="!smAndDown">
      <div class="o-aboutTheProject__desktopPanelBackgroundDiv mx-n3"></div>
      <div
        class="o-aboutTheProject__desktopPanel"
        v-for="(panel, index) in panels"
        :key="index"
        :id="panel.id"
      >
        <component :is="panel.component" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useElementSize } from '@vueuse/core'
import { useDebounceFn } from '@vueuse/core'

import RowAtom from '@/components/atoms/row/RowAtom.vue'
import ColAtom from '@/components/atoms/col/ColAtom.vue'
import ExpansionPanels from '@/components/atoms/expansionPanels/ExpansionPanels.vue'
import ExpansionPanel from '@/components/atoms/expansionPanel/ExpansionPanel.vue'
import SectionHeader from '@/components/molecules/about/sectionHeader/SectionHeader.vue'
import PanelsNavigation from '@/components/molecules/about/aboutTheProject/panelsNavigation/PanelsNavigation.vue'
import ApplicationFunctionality from '@/components/molecules/about/aboutTheProject/applicationFunctionality/ApplicationFunctionality.vue'
import AdditionalFeatures from '@/components/molecules/about/aboutTheProject/additionalFeatures/AdditionalFeatures.vue'
import DevelopmentConventions from '@/components/molecules/about/aboutTheProject/developmentConventions/DevelopmentConventions.vue'
import TechnologyStack from '@/components/molecules/about/aboutTheProject/technologyStack/TechnologyStack.vue'

import { useHeaderStore } from '@/stores'
import { useAboutScrollToStore } from '@/stores'

const { height: documentBodyHeight } = useElementSize(document.body)
/**
 * Debounced function to refresh ScrollTrigger instances.
 * This function uses a debounce mechanism to limit the rate at which
 * ScrollTrigger.refresh() is called, ensuring it is invoked at most once
 * every 200 milliseconds.
 * The function is needed because expansion panels changes document body height:
 * ScrollTriggers need to be recalculated to work properly
 *
 * @function refreshScrollTriggersWithDebounce
 * @returns {void}
 */
const refreshScrollTriggersWithDebounce = useDebounceFn(() => {
  ScrollTrigger.refresh()
}, 200)
watch(documentBodyHeight, () => {
  refreshScrollTriggersWithDebounce()
})

const headerStore = useHeaderStore()
const { headerHeight, viewportHeightWithoutHeader } = storeToRefs(headerStore)

const { t } = useI18n()
const panels = computed(() => [
  {
    text: t('about.aboutProject.panels.applicationFunctionality'),
    component: ApplicationFunctionality,
    id: 'ApplicationFunctionality'
  },
  {
    text: t('about.aboutProject.panels.additionalFeatures'),
    component: AdditionalFeatures,
    id: 'AdditionalFeatures'
  },
  {
    text: t('about.aboutProject.panels.developmentConventions'),
    component: DevelopmentConventions,
    id: 'DevelopmentConventions'
  },
  {
    text: t('about.aboutProject.panels.technologyStack'),
    component: TechnologyStack,
    id: 'TechnologyStack'
  }
])
const panelsButtons = computed(() =>
  panels.value.map((panel) => ({ text: panel.text, id: panel.id }))
)

type Panel = (typeof panels.value)[number]
const currentPanel = ref<Panel | null>(panels.value[0])

const mobilePanel = ref([0])

const aboutScrollToStore = useAboutScrollToStore()
const { sections } = aboutScrollToStore
const { scrollToIsActive } = storeToRefs(aboutScrollToStore)

let horizontalScrollTween: gsap.core.Tween
const { smAndDown } = useDisplay()

const scrollAnimationOnDesktop = () => {
  if (smAndDown.value) return
  const aboutTheProject: HTMLElement | null = document.querySelector('.o-aboutTheProject')
  const desktopPanels = gsap.utils.toArray('.o-aboutTheProject__desktopPanel')
  if (!aboutTheProject || !desktopPanels) return
  const scrollIntoViewFirstPanelTween = gsap.to(aboutTheProject, {
    scrollTrigger: {
      trigger: aboutTheProject,
      start: 'top center',
      markers: false,
      scrub: 1,
      onEnter: () => {
        // omit animation if user is using main page navigation between sections
        if (scrollToIsActive.value) return
        gsap.to(window, {
          scrollTo: {
            y: aboutTheProject,
            offsetY: headerHeight.value
          },
          ease: 'expo.inOut',
          duration: 2
        })
      }
    }
  })
  horizontalScrollTween = gsap.to(desktopPanels, {
    xPercent: -100 * (desktopPanels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: aboutTheProject,
      start: `top ${headerHeight.value}px`,
      markers: false,
      scrub: 1,
      pin: aboutTheProject,
      snap: {
        snapTo: 1 / (panels.value.length - 1),
        inertia: false
      },
      end: () => '+=' + aboutTheProject.offsetWidth
    },
    onUpdate: () => {
      const currentPanelIndex = Math.round(
        horizontalScrollTween.progress() * (desktopPanels.length - 1)
      )
      currentPanel.value = panels.value[currentPanelIndex]
    }
  })
  const tl = gsap.timeline()
  tl.add(scrollIntoViewFirstPanelTween)
  tl.add(horizontalScrollTween)
}

const navigateToPanelId = (id: string) => {
  const targetElement = document.querySelector<HTMLElement>(`#${id}`)
  if (!targetElement || !horizontalScrollTween.scrollTrigger) return
  const totalScroll =
    horizontalScrollTween.scrollTrigger.end - horizontalScrollTween.scrollTrigger.start
  const totalMovement = (panels.value.length - 1) * targetElement.offsetWidth
  const y = Math.round(
    horizontalScrollTween.scrollTrigger.start +
      (targetElement.offsetLeft / totalMovement) * totalScroll
  )
  gsap.to(window, {
    scrollTo: {
      y: y
    },
    duration: 1
  })
}

onMounted(() => {
  scrollAnimationOnDesktop()
})
</script>

<style lang="scss">
@use '@/assets/vuetify/settings';
@use 'sass:map';

.o-aboutTheProject {
  @media #{map.get(settings.$display-breakpoints, 'md-and-up')} {
    height: v-bind(viewportHeightWithoutHeader);
  }

  display: flex;
  flex-direction: column;

  &__desktopPanelContainer {
    position: relative;
    flex: 1;
    display: flex;
    flex-wrap: nowrap;
    -ms-flex-item-align: center;
    align-self: start;
    align-items: stretch;
  }

  &__desktopPanelBackgroundDiv {
    position: absolute;
    width: 100vw;
    height: 100%;
    left: 0;
    background: linear-gradient(
      to right,
      rgba(var(--v-theme-background)) 0%,
      var(--about-complementary-color) 20%,
      var(--about-complementary-color) 80%,
      rgba(var(--v-theme-background)) 100%
    );
    opacity: 0.15;
  }

  &__desktopPanel {
    width: 100vw;
  }
}
</style>
