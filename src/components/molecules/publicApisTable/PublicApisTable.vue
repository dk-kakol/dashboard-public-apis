<template>
  <TableAtom data-test="m-publicApisTable" hover>
    <thead class="text-h6">
      <tr class="d-table-row d-md-none">
        <th v-for="itemKey in mobileFields" :key="itemKey" class="font-weight-bold">
          {{ $t(`table.mobile.${itemKey}`) }}
        </th>
      </tr>
      <tr class="d-none d-md-table-row" data-test="m-publicApisTable__headTd">
        <th
          v-for="itemKey in desktopFields"
          :key="itemKey"
          class="text-left font-weight-bold"
          :class="`m-publicApisTable__${formatKey(itemKey)}Td`"
        >
          {{ $t(`table.keys.${itemKey.toLowerCase()}`) }}
        </th>
      </tr>
    </thead>
    <tbody v-if="noResult">
      <tr>
        <th :colspan="colSpan" class="text-center" data-test="m-publicApisTable__noResultsSection">
          {{ $t('table.noResult') }}
        </th>
      </tr>
    </tbody>
    <tbody v-else>
      <tr class="d-table-row d-md-none" v-for="item in props.apis" :key="item.API">
        <td class="m-publicApisTable__apiTd">
          {{ item.API }}
        </td>
        <td class="m-publicApisTable__detailsTd">
          <DetailsTd :keyText="$t('table.keys.auth')" :valueText="item.Auth"></DetailsTd>
          <DetailsTd :keyText="$t('table.keys.category')" :valueText="item.Category"></DetailsTd>
          <DetailsTd :keyText="$t('table.keys.link')">
            <ButtonAtom icon variant="text" :href="item.Link" target="_blank">
              <IconAtom icon="mdi-open-in-new"></IconAtom>
            </ButtonAtom>
          </DetailsTd>
          <DetailsTd
            :keyText="$t('table.keys.description')"
            :valueText="item.Description"
            v-orphans
          ></DetailsTd>
        </td>
      </tr>
      <tr
        class="d-none d-md-table-row"
        v-for="item in props.apis"
        :key="item.API"
        data-test="m-publicApisTable__bodyTr"
      >
        <td v-for="itemKey in desktopFields" :key="itemKey">
          <div v-if="isKey(item, itemKey)">
            <ButtonAtom
              v-if="itemKey === 'Link'"
              icon
              variant="text"
              :href="item[itemKey]"
              target="_blank"
              data-test="m-publicApisTable__apisLinkButton"
            >
              <IconAtom icon="mdi-open-in-new"></IconAtom>
            </ButtonAtom>
            <div v-else v-orphans>{{ item[itemKey] }}</div>
          </div>
        </td>
      </tr>
    </tbody>
  </TableAtom>
</template>

<script setup lang="ts">
import IconAtom from '@/components/atoms/icons/IconAtom.vue'
import TableAtom from '@/components/atoms/table/TableAtom.vue'
import ButtonAtom from '@/components/atoms/buttons/ButtonAtom.vue'
import DetailsTd from '@/components/molecules/publicApisTable/detailsTd/DetailsTd.vue'
import type { EntryKeys, Entries } from '@/types'
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { isKey } from '@/helpers'

type Props = {
  /** Array of public apis */
  apis: Entries
}

const props = defineProps<Props>()

const desktopFields: EntryKeys[] = [
  'API',
  'Description',
  'Auth',
  'HTTPS',
  'Cors',
  'Category',
  'Link'
]
const mobileFields = ['api', 'details']

const { smAndDown } = useDisplay()
const colSpan = computed<number>(() =>
  smAndDown.value ? mobileFields.length : desktopFields.length
)

const noResult = computed<boolean>(() => props.apis.length === 0)

const formatKey = function (key: string): string {
  return key.toLowerCase()
}
</script>

<style lang="scss">
@use '@/assets/vuetify/settings';
@use 'sass:map';

.m-publicApisTable {
  &__descriptionTd {
    width: 30%;
  }

  &__detailsTd {
    @media #{map.get(settings.$display-breakpoints, 'md-and-down')} {
      width: 70%;
    }
  }
}
</style>
