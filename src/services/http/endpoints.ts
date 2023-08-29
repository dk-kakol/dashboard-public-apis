import type { EndpointParams, ApiEndpoints } from "@/types";
class Endpoints {
  apiPrefix: string;

  constructor() {
    this.apiPrefix = import.meta.env.VITE_APP_API_URL;
  }

  get(endpointLabel: ApiEndpoints, params?: EndpointParams): string {
    let url = endpointLabel as string;

    if (typeof params === 'object') {
      Object.keys(params).forEach((param) => {
        url = url.replace(`:${param}`, params[param]);
      });
    } else if (url.indexOf('/:') > 0) {
      url = url.substring(0, url.indexOf('/:'));
    }

    return this.apiPrefix.concat(url);
  }
}

export default new Endpoints();
