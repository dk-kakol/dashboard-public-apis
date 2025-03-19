<template>
  <v-btn v-bind="$attrs" :density="props.density ?? 'compact'" :variant="props.variant ?? 'text'">
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">
import type { ButtonDensity, ButtonVarant } from '@/types'

interface Props {
  density?: ButtonDensity
  variant?: ButtonVarant
}
const props = defineProps<Props>()

defineSlots<{
  default(props: Record<string, unknown>): unknown
}>()
</script>
