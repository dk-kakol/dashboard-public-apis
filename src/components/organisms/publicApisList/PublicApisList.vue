<template>
  <PublicApisTable :apis></PublicApisTable>
  <PaginationAtom :length="7" v-model="currentPagination"></PaginationAtom>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PublicApisTable from '@/components/molecules/publicApisTable/PublicApisTable.vue';
import PaginationAtom from '@/components/atoms/pagination/PaginationAtom.vue';
import type { Entries } from '@/types';

const apis: Entries = [
  {
    "API": "AdoptAPet",
    "Description": "Resource to help get pets adopted",
    "Auth": "apiKey",
    "HTTPS": true,
    "Cors": "yes",
    "Link": "https://www.adoptapet.com/public/apis/pet_list.html",
    "Category": "Animals"
  },
  {
    "API": "Axolotl",
    "Description": "Collection of axolotl pictures and facts",
    "Auth": "",
    "HTTPS": true,
    "Cors": "no",
    "Link": "https://theaxolotlapi.netlify.app/",
    "Category": "Animals"
  }
];
const currentPagination = ref<number>();

// ten komponent będzie zbierał w całość wysłanie requesta o listę, 
// requesta o filtry, paginacje
// loaderki, etc.
</script>