<template>
  <DefaultTemplate>
    <template #body>
      <div class="text-h1 bg-amber-accent-4">Elo from About View!</div>
      <!-- Widok About, zawiera:
      Opis co to jest
      Sprawdź czy service jest alive, jeśli nie, to włącz mockowanie requestów,
      Link do serwisu
      Kontakt do autora -->
    </template>
  </DefaultTemplate>
</template>

<script setup lang="ts">
import DefaultTemplate from '@/components/templates/DefaultTemplate.vue';
</script>