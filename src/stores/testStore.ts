import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import publicApis from '@/services/http/api/publicApis';

// jak coś to tu trzeba typescripta dodać też
const useTestStore = defineStore('testStore', () => {
  // state
  const count = ref<number>(0);

  // getters
  const getCount = computed<number>(() => count.value);

  // actions
  const fetchPublicApis = async () => {
    await publicApis.fetchList().then((data) => {
      count.value = data.data.count as number;
    });
  }

  return {
    count,
    getCount,
    fetchPublicApis,
  }

})

export default useTestStore;