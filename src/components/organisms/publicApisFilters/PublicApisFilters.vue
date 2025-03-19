<template>
  <SingleExpansionPanel class="mb-2" data-test="o-publicApisFilters__expansionPanel">
    <template #title>
      {{ $t('filters.api.title') }}
    </template>
    <template #text>
      <RowAtom data-test="o-publicApisFilters__filters">
        <ColAtom
          v-for="(filter, index) in apisFiltersSchema"
          :key="index"
          cols="12"
          :md="filter.md"
        >
          <component
            v-if="filter.componentReference"
            :is="filter.componentReference"
            v-model="getApisFilters[filter.name]"
            v-bind="filter"
            :label="$t(`filters.api.label.${filter.name}`)"
            :data-test="`o-publicApisFilters__${filter.name}`"
          >
            <template v-slot:item="{ props: itemProps }" v-if="filter.name === 'auth'">
              <v-list-item v-bind="itemProps">
                <template #title="{ title }">
                  {{ title || 'unknown' }}
                </template>
              </v-list-item>
            </template>
            <template v-slot:selection="{ selectionItem }" v-if="filter.name === 'auth'">
              <v-list-item :title="selectionItem.title" class="o-publicApisFilters__authFilter">
                <template #title="{ title }">
                  {{ title || 'unknown' }}
                </template>
              </v-list-item>
            </template>
          </component>
        </ColAtom>
        <ColAtom cols="auto">
          <ButtonAtom
            @click="onFilter"
            :disabled="apisLoading"
            data-test="o-publicApisFilters__filterButton"
          >
            {{ $t('filters.api.filter') }}</ButtonAtom
          >
        </ColAtom>
        <ColAtom cols="auto">
          <ButtonAtom
            @click="onReset()"
            :disabled="apisLoading"
            data-test="o-publicApisFilters__resetButton"
          >
            {{ $t('filters.api.reset') }}</ButtonAtom
          >
        </ColAtom>
      </RowAtom>
    </template>
  </SingleExpansionPanel>
</template>

<script setup lang="ts">
import SingleExpansionPanel from '@/components/molecules/singleExpansionPanel/SingleExpansionPanel.vue'
import FormTextField from '@/components/molecules/formTextField/FormTextField.vue'
import FormSelect from '@/components/molecules/formSelect/FormSelect.vue'
import FormAutocomplete from '@/components/molecules/formAutocomplete/FormAutocomplete.vue'
import ButtonAtom from '@/components/atoms/buttons/ButtonAtom.vue'
import RowAtom from '@/components/atoms/row/RowAtom.vue'
import ColAtom from '@/components/atoms/col/ColAtom.vue'
import { z } from '@/plugins/zod'
import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
import { useApisFiltersStore } from '@/stores'
import { useApisStore } from '@/stores'
import { useResourcesStore } from '@/stores'
import { computed } from 'vue'

const apisFiltersStore = useApisFiltersStore()
const { getApisFilters } = storeToRefs(apisFiltersStore)

const apisStore = useApisStore()
const { loading: apisLoading } = storeToRefs(apisStore)

const resourcesStore = useResourcesStore()
await resourcesStore.fetchResources()
const { getCategoriesResources, getAuthResources, getCorsResources } = storeToRefs(resourcesStore)

type Emits = {
  (e: 'filter'): void
}

const emit = defineEmits<Emits>()

const onFilter = function () {
  emit('filter')
}

const onReset = async function () {
  apisFiltersStore.resetApisFilters()
  await apisStore.fetchApis()
}

const apisFiltersSchema = computed(() => [
  {
    componentReference: FormTextField,
    name: 'search',
    rules: toTypedSchema(z.string().excludeSpecialRefine().nullish()),
    // it is also possible to pass vee-validate globally defined rules
    // rules: 'excludeSpecial',
    md: 6
  },
  {
    componentReference: FormAutocomplete,
    name: 'category',
    items: getCategoriesResources.value,
    'item-title': 'name',
    'item-value': 'id',
    md: 6
  },
  {
    componentReference: FormSelect,
    name: 'auth',
    items: getAuthResources.value,
    'item-title': 'name',
    'item-value': 'id',
    md: 6
  },
  {
    componentReference: FormSelect,
    name: 'cors',
    items: getCorsResources.value,
    'item-title': 'name',
    'item-value': 'id',
    md: 6
  }
])
</script>

<style>
.o-publicApisFilters__authFilter {
  min-height: 0;
  padding: 0;
}
</style>
