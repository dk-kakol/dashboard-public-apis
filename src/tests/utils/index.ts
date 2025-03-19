import createWrapper from '@/tests/utils/createWrapper'
import i18n, { messages } from '@/plugins/i18n'
import type { VueWrapper } from '@vue/test-utils'
import { nextTick, type DefineComponent } from 'vue'
import { flushPromises } from '@vue/test-utils'

export { createWrapper, i18n, messages, flushPromises, nextTick }

export type { VueWrapper, DefineComponent }
