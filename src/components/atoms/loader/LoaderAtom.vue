<template>
  <v-skeleton-loader :type="type.toString()" :loading="props.loading" data-test="a-loaderAtom">
    <slot></slot>
  </v-skeleton-loader>
</template>

<script setup lang="ts">
import type { LoaderProps } from '@/types'

type Props = LoaderProps
const props = withDefaults(defineProps<Props>(), {
  type: () => ['card'],
  loading: false
})

defineSlots<{
  default(props: Record<string, unknown>): unknown
}>()
</script>
