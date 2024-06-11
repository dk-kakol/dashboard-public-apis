import { useHttp } from '@/composables/useHttp/useHttp';
import { ApiEndpoints } from '@/types';
import { resourcesSchema } from '@/services/http/schemas/resources';

export default {
  fetchResources() {
    return useHttp({
      endpoint: ApiEndpoints.resources,
      responseSchema: resourcesSchema,
      options: { immediate: false }
    });
  }
};
