<template>
  <DefaultTemplate>
    <template #body>
      <PublicApisList
        :apis="apis"
        :loading="false"
        :pagesCount="5"
        v-model:currentPage="currentPage"
      ></PublicApisList>
    </template>
  </DefaultTemplate>
</template>

<script setup lang="ts">
import DefaultTemplate from '@/components/templates/DefaultTemplate.vue';
import PublicApisList from '@/components/organisms/publicApisList/PublicApisList.vue';
import type { Entries } from '@/types';
// import { Auth } from '@/types';
import { ref } from 'vue';

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

const currentPage = ref<number>(3);
// ten komponent będzie zbierał w całość wysłanie requesta o listę i współpracę ze store'm
</script>
