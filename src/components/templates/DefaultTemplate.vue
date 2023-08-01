<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon icon="mdi-menu" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>{{ $t('template.header.title') }}</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`"
        @click="$i18n.locale = locale"
        density="compact"
        :variant="$i18n.locale === locale ? 'tonal' : 'text'">
        {{ locale }}
      </v-btn>
      <v-btn @click="toggleTheme" icon density="compact">
        <v-icon icon="mdi-theme-light-dark"></v-icon>
      </v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary width="110">
    <v-list nav density="compact">
      <v-list-item
        v-for="item in items"
        :key="item?.title"
        :title="$t(item?.title)"
        :to="item?.route"
        ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <slot name="body"></slot>
  </v-main>

  <v-footer></v-footer>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';
import { ref } from 'vue';

const theme = useTheme();
const drawer = ref(false);
const items = ref([
  { title: 'template.menu.aboutTitle', route: { name: 'About' }},
  { title: 'template.menu.homeTitle', route: { name: 'Home' }},
]);
const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';

</script>
