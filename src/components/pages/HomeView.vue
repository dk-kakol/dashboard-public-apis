<template>
  <DefaultTemplate>
    <template #body>
      <div class="text-h1 bg-amber-accent-4">Elo from Home View!</div>
      <PublicApisList :items="apis"></PublicApisList>
    </template>
  </DefaultTemplate>
</template>

<script setup lang="ts">
import DefaultTemplate from '@/components/templates/DefaultTemplate.vue';
import PublicApisList from '@/components/organisms/publicApisList/PublicApisList.vue';
import type { Entries } from '@/types';
// import { Auth } from '@/types';

const apis: Entries = [
  {
    API: 'AdoptAPet',
    Description: 'Resource to help get pets adopted',
    Auth: 'apiKey',
    // "Auth": Auth.APIKey,
    HTTPS: true,
    Cors: 'yes',
    Link: 'https://www.adoptapet.com/public/apis/pet_list.html',
    Category: 'Animals'
  },
  {
    API: 'Axolotl',
    Description: 'Collection of axolotl pictures and facts',
    Auth: '',
    HTTPS: true,
    Cors: 'no',
    Link: 'https://theaxolotlapi.netlify.app/',
    Category: 'Animals'
  }
];
</script>
