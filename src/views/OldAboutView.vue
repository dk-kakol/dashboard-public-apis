<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn>Button</v-btn>
    <v-icon icon="fas fa-plus"></v-icon>
    <div>
      <input name="fieldName" v-model="value" @input="handleChange" />
      <span v-if="errorMessage && meta.dirty">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import publicApis from '@/services/http/api/publicApis';

publicApis.fetchList().then((data) => {
  console.log(data);
});
const { errorMessage, meta, value, handleChange } = useField<string>(
  'fieldName',
  'excludeSpecial|min:2'
);
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
