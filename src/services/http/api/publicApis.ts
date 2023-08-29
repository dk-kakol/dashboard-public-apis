import Http from '@/services/http/index';
import Endpoints from '@/services/http/endpoints';
import { ApiEndpoints, type EntriesResponse } from '@/types';

export default {
  fetchList() {
    return Http.get<EntriesResponse>(Endpoints.get(ApiEndpoints.list));
  }
};
