import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useElementBounding } from '@vueuse/core'

export const useHeaderStore = defineStore('header', () => {
  const headerRef = ref<HTMLElement | null>(null)

  const { height: headerHeight } = useElementBounding(headerRef)

  const V_CONTAINER_PADDING = 16
  const viewportHeightWithoutHeaderAndPadding = computed(
    () => `calc(100vh - ${headerHeight.value + V_CONTAINER_PADDING}px)`
  )
  const viewportHeightWithoutHeader = computed(() => `calc(100vh - ${headerHeight.value}px)`)
  return {
    headerRef,
    headerHeight,
    V_CONTAINER_PADDING,
    viewportHeightWithoutHeaderAndPadding,
    viewportHeightWithoutHeader
  }
})
