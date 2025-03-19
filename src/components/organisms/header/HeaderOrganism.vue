<template>
  <v-app-bar ref="headerRef">
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        icon="mdi-menu"
        @click.stop="drawer = !drawer"
        :size="defaultSize"
        data-test="o-header__menuButton"
      >
      </v-app-bar-nav-icon>
    </template>

    <v-app-bar-title class="d-none d-sm-block">{{ $t('template.header.title') }}</v-app-bar-title>
    <template v-slot:append>
      <ButtonAtom
        icon
        v-for="buttonLocale in availableLocales"
        :key="`locale-${buttonLocale}`"
        @click="changeLocale(buttonLocale)"
        :variant="locale === buttonLocale ? 'tonal' : 'text'"
        :size="defaultSize"
        data-test="o-header__localeButton"
      >
        {{ buttonLocale }}
      </ButtonAtom>
      <ButtonAtom @click="toggleTheme" icon>
        <IconAtom icon="mdi-theme-light-dark"></IconAtom>
      </ButtonAtom>
    </template>
  </v-app-bar>

  <NavigationDrawer
    :items="items"
    v-model="drawer"
    data-test="o-header__navigationDrawer"
  ></NavigationDrawer>
</template>

<script setup lang="ts">
import IconAtom from '@/components/atoms/icons/IconAtom.vue'
import ButtonAtom from '@/components/atoms/buttons/ButtonAtom.vue'

import NavigationDrawer from '@/components/molecules/header/NavigationDrawer.vue'

import { useTheme } from 'vuetify'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@vee-validate/i18n'

import type { IconSize } from '@/types'
import type { NavigationDrawerListItem } from '@/types'
import type { ThemeName } from '@/types'

import iconsSize from '@/composables/iconsSize/iconsSize'
import { useHeaderStore } from '@/stores'

const defaultSize: IconSize = iconsSize()

const theme = useTheme()
const drawer = ref<boolean>(false)
const items = ref<NavigationDrawerListItem[]>([
  { title: 'template.menu.aboutTitle', route: { name: 'About' } },
  { title: 'template.menu.homeTitle', route: { name: 'Home' } }
])
const toggleTheme = (): ThemeName =>
  (theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark')

const { locale, availableLocales } = useI18n({
  useScope: 'global'
})

const changeLocale = async (newLocale: string) => {
  locale.value = newLocale
  setLocale(newLocale)
}

const headerStore = useHeaderStore()
const { headerRef } = storeToRefs(headerStore)
</script>
