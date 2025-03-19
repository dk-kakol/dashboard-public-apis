<template>
  <div>
    <InputAtom
      :error-messages="errorMessage"
      :type="type"
      :model-value="value"
      v-on="validationListeners"
      v-bind="$attrs"
      data-test="m-formTextField"
    >
      <template #append v-if="$slots.append">
        <slot name="append"></slot>
      </template>
      <template #append-inner v-if="$slots['append-inner']">
        <slot name="append-inner"></slot>
      </template>
      <template #prepend v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </template>
      <template #prepend-inner v-if="$slots['prepend-inner']">
        <slot name="prepend-inner"></slot>
      </template>
    </InputAtom>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRefs } from 'vue'
import type { MaybeRef } from 'vue'
import type { RuleExpression } from 'vee-validate'

import InputAtom from '@/components/atoms/textField/TextFieldAtom.vue'

type Props = {
  name: string
  rules?: MaybeRef<RuleExpression<unknown>>
  type?: string
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text'
})

defineSlots<{
  append(props: Record<string, unknown>): unknown
  'append-inner'(props: Record<string, unknown>): unknown
  prepend(props: Record<string, unknown>): unknown
  'prepend-inner'(props: Record<string, unknown>): unknown
}>()

defineModel()

const { name, rules } = toRefs(props)

const { value, errorMessage, handleChange, handleBlur } = useField(name, rules.value, {
  syncVModel: true,
  validateOnValueUpdate: false,
  keepValueOnUnmount: true
})

const validationListeners = {
  blur: (evt: Event) => handleBlur(evt, true),
  change: handleChange,
  input: (evt: Event) => handleChange(evt, !!errorMessage.value)
}
</script>
