<template>
  <v-icon v-bind="$attrs" :size="props.size ?? defaultSize" :icon="icon"></v-icon>
</template>

<script setup lang="ts">
import type { IconSize } from '@/types'
import iconsSize from '@/composables/iconsSize/iconsSize'

const defaultSize: IconSize = iconsSize()

interface Props {
  size?: string | number
  /** mdi- plus icon name from https://pictogrammers.com/library/mdi/ */
  icon: string
}
const props = defineProps<Props>()
</script>
