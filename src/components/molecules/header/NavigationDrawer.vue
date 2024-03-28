<template>
  <v-navigation-drawer :value="$attrs.value" temporary width="110">
    <v-list nav density="compact">
      <v-list-item
        v-for="item in items"
        :key="item?.title"
        :title="$t(item?.title)"
        :to="item?.route"
        class="m-navigationDrawer__listItem -overwritePadding"
        data-test="m-navigationDrawer__listItem"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import type { NavigationDrawerListItem } from '@/types';

interface Props {
  items: NavigationDrawerListItem[];
}
const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.m-navigationDrawer__listItem {
  &.-overwritePadding {
    padding-inline-start: 6px;
    padding-inline-end: 6px;
  }
}
</style>
