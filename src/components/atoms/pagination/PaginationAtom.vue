<template>
  <v-pagination
    v-model="currentPage"
    :length="props.length"
    :disabled="props.disabled"
    :total-visible="props.totalVisible"
    next-icon="mdi-menu-right"
    prev-icon="mdi-menu-left"
    v-bind="$attrs"
  ></v-pagination>
</template>

<script setup lang="ts">
import type { PaginationAtomProps } from '@/types'

type Props = PaginationAtomProps
const props = defineProps<Props>()

const currentPage = defineModel<number>()
</script>
