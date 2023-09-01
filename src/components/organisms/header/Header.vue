<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        icon="mdi-menu" @click.stop="drawer = !drawer" :size="defaultSize"
        data-test="o-header__menuButton">
      </v-app-bar-nav-icon>
    </template>

    <v-app-bar-title class="d-none d-sm-block">{{ $t('template.header.title') }}</v-app-bar-title>
    <template v-slot:append>
      <Button icon v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`"
        @click="$i18n.locale = locale"
        :variant="$i18n.locale === locale ? 'tonal' : 'text'"
        :size="defaultSize"
        data-test="o-header__localeButton">
        {{ locale }}
      </Button>
      <Button @click="toggleTheme" icon>
        <Icon icon="mdi-theme-light-dark"></Icon>
      </Button>
    </template>
  </v-app-bar>

  <NavigationDrawer :items="items" v-model="drawer"
    data-test="o-header__navigationDrawer"></NavigationDrawer>
</template>

<script setup lang="ts">
import Icon from '@/components/atoms/icons/Icon.vue';
import Button from '@/components/atoms/buttons/Button.vue';

import NavigationDrawer from '@/components/molecules/header/NavigationDrawer.vue';

import { useTheme } from 'vuetify';
import { ref } from 'vue';
import type { IconSize } from '@/types';
import type { NavigationDrawerListItem } from '@/types';
import type { ThemeName } from '@/types';

import iconsSize from '@/composables/iconsSize';

const defaultSize: IconSize = iconsSize();

const theme = useTheme();
const drawer = ref<boolean>(false);
const items = ref<NavigationDrawerListItem[]>([
  { title: 'template.menu.aboutTitle', route: { name: 'About' }},
  { title: 'template.menu.homeTitle', route: { name: 'Home' }},
]);
const toggleTheme = (): ThemeName => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
</script>
