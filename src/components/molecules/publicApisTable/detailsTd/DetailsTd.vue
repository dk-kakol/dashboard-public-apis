<template>
  <RowAtom align="center" no-gutters data-test="m-detailsTd">
    <ColAtom cols="12" sm="4" class="font-italic text-decoration-underline">
      {{ props.keyText.concat(': ') }}
    </ColAtom>
    <ColAtom>
      <span>
        <slot>{{ props.valueText }}</slot>
      </span>
    </ColAtom>
  </RowAtom>
</template>

<script setup lang="ts">
import RowAtom from '@/components/atoms/row/RowAtom.vue'
import ColAtom from '@/components/atoms/col/ColAtom.vue'

type Props = {
  keyText: string
  valueText?: string
}
const props = defineProps<Props>()
</script>
