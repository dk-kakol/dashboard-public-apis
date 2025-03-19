<template>
  <div>
    <SelectAtom :error-messages="errorMessage" v-model="value" :items="items" v-bind="$attrs">
      <template #item="{ props, item }" v-if="$slots.item">
        <slot name="item" v-bind="{ props, item }"></slot>
      </template>
      <template #selection="{ selectionItem }" v-if="$slots.selection">
        <slot name="selection" v-bind="{ selectionItem }"></slot>
      </template>
    </SelectAtom>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRefs } from 'vue'
import type { MaybeRef } from 'vue'
import type { RuleExpression } from 'vee-validate'

import SelectAtom from '@/components/atoms/select/SelectAtom.vue'

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
