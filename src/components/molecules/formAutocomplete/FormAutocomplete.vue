<template>
  <div>
    <AutocompleteAtom
      :error-messages="errorMessage"
      v-model="value"
      :items="items"
      v-bind="$attrs"
      data-test="m-formAutocomplet"
    >
      <template #item="{ props, item }" v-if="$slots.item">
        <slot name="item" v-bind="{ props, item }"></slot>
      </template>
      <template #selection="{ item }" v-if="$slots.selection">
        <slot name="selection" v-bind="{ item }"></slot>
      </template>
    </AutocompleteAtom>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRefs } from 'vue'
import type { MaybeRef } from 'vue'
import type { RuleExpression } from 'vee-validate'

import AutocompleteAtom from '@/components/atoms/autocomplete/AutocompleteAtom.vue'

type Props = {
  name: string
  items: unknown[]
  rules?: MaybeRef<RuleExpression<unknown>>
}
const props = defineProps<Props>()

defineModel()

const { name, rules } = toRefs(props)

const { value, errorMessage } = useField(name, rules.value, {
  syncVModel: true,
  keepValueOnUnmount: true
})
</script>
