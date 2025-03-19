import { defineStore, storeToRefs } from 'pinia'
import { useHeaderStore } from '@/stores'
import { ref } from 'vue'
import { gsap } from 'gsap'

export const useAboutScrollToStore = defineStore('aboutScrollToStore', () => {
  const scrollToIsActive = ref<boolean>(false)

  const sections = [
    'titleSection',
    'aboutMe',
    'aboutTheProject',
    'contentCreation',
    'contactMe'
  ] as const
  type Section = (typeof sections)[number]

  const headerStore = useHeaderStore()
  const { headerHeight } = storeToRefs(headerStore)

  const scroll = (name: Section) => {
    scrollToIsActive.value = true
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: `#${name}`, offsetY: headerHeight.value },
      ease: 'expo.inOut',
      onComplete: () => {
        scrollToIsActive.value = false
      }
    })
  }

  return {
    sections,
    scrollToIsActive,
    scroll
  }
})
