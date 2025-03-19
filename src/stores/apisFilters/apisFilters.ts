import { defineStore } from 'pinia'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'

export const useApisFiltersStore = defineStore('apisFiltersStore', () => {
  const {
    values: getApisFilters,
    errors: getApisFiltersErrors,
    meta: getApisFiltersMeta,
    validate: validateApisFilters,
    resetForm: resetApisFilters
  } = useForm()

  const { locale } = useI18n({
    useScope: 'global'
  })

  watch(locale, async () => {
    if (getApisFiltersErrors.value) await validateApisFilters()
  })

  return {
    locale,
    getApisFilters,
    getApisFiltersErrors,
    getApisFiltersMeta,
    validateApisFilters,
    resetApisFilters
  }
})
