import Http from '@/services/http/index';
import Endpoints from '@/services/http/endpoints';

// tutaj obsługa typescripta lepsiejsza
export default {
  getList() {
    return Http.get(Endpoints.get('list'));
  }
};
