<template>
  <div class="o-contactMe" :id="sections[4]">
    <div class="o-contactMe__header">
      <RowAtom justify="center" no-gutters>
        <ColAtom cols="10">
          <SectionHeader :title="$t('about.titleSection.navigation.contact')" />
        </ColAtom>
      </RowAtom>
    </div>
    <div class="o-contactMe__content">
      <RowAtom justify="center" no-gutters>
        <ColAtom cols="10">
          <ContactMeContent />
        </ColAtom>
      </RowAtom>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import RowAtom from '@/components/atoms/row/RowAtom.vue'
import ColAtom from '@/components/atoms/col/ColAtom.vue'
import SectionHeader from '@/components/molecules/about/sectionHeader/SectionHeader.vue'
import ContactMeContent from '@/components/molecules/about/contactMeContent/ContactMeContent.vue'

import { useHeaderStore } from '@/stores'
import { useAboutScrollToStore } from '@/stores'

const headerStore = useHeaderStore()
const { viewportHeightWithoutHeaderAndPadding } = storeToRefs(headerStore)

const aboutScrollToStore = useAboutScrollToStore()
const { sections } = aboutScrollToStore
</script>

<style lang="scss">
@use '@/assets/vuetify/settings';
@use 'sass:map';

.o-contactMe {
  height: v-bind(viewportHeightWithoutHeaderAndPadding);
  display: flex;
  flex-direction: column;

  &__header {
    width: 100%;
    flex: 0 1 auto; /* Takes the content height */
  }

  &__content {
    width: 100%;
    flex: 1 1 auto; /* Takes the remaining height */
    display: flex;
  }
}
</style>
