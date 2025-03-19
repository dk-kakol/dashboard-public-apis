<template>
  <RowAtom justify="center" class="o-aboutMe mb-3 mb-md-9" no-gutters :id="sections[1]">
    <ColAtom cols="10">
      <RowAtom no-gutters>
        <ColAtom cols="12" class="mb-md-9">
          <SectionHeader :title="$t('about.titleSection.navigation.aboutMe')" />
        </ColAtom>
      </RowAtom>
      <RowAtom no-gutters class="mb-3" :class="{ 'h-100': mdAndUp }">
        <ColAtom xl="4" lg="5" md="6" cols="12" class="o-aboutMe__image mt-3 mb-9 mb-0">
          <AboutMeImage></AboutMeImage>
        </ColAtom>
        <v-spacer></v-spacer>
        <ColAtom cols="12" md="6" class="pl-md-3">
          <AboutMeInfo />
        </ColAtom>
      </RowAtom>
    </ColAtom>
  </RowAtom>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'

import RowAtom from '@/components/atoms/row/RowAtom.vue'
import ColAtom from '@/components/atoms/col/ColAtom.vue'
import SectionHeader from '@/components/molecules/about/sectionHeader/SectionHeader.vue'
import AboutMeInfo from '@/components/molecules/about/aboutMeInfo/AboutMeInfo.vue'
import AboutMeImage from '@/components/molecules/about/aboutMeImage/AboutMeImage.vue'

import { useHeaderStore } from '@/stores'
import { useAboutScrollToStore } from '@/stores'

const headerStore = useHeaderStore()
const { viewportHeightWithoutHeader } = storeToRefs(headerStore)

const aboutScrollToStore = useAboutScrollToStore()
const { sections } = aboutScrollToStore
const { mdAndUp } = useDisplay()
</script>

<style lang="scss">
@use '@/assets/vuetify/settings';
@use 'sass:map';

.o-aboutMe {
  min-height: v-bind(viewportHeightWithoutHeader);

  .o-aboutMe__image {
    height: 70%;

    @media #{map.get(settings.$display-breakpoints, 'xs')} {
      height: 400px;
    }

    @media #{map.get(settings.$display-breakpoints, 'sm')} {
      height: 550px;
    }
  }
}
</style>
