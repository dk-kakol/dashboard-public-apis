interface endpointType {
  [key: string]: string;
}

interface paramsType {
  [key: string]: any;
}

class Endpoints {
  endpoints: endpointType;
  apiPrefix: string;

  constructor() {
    this.endpoints = {
      list: 'entries',
      random: 'random',
      categories: 'categories',
      testError: 'test/:id'
    };
    this.apiPrefix = import.meta.env.VITE_APP_API_URL;
  }

  get(endpointLabel: string, params?: paramsType): string | never {
    if (this.endpoints[endpointLabel] === undefined) {
      throw new Error('undefined api path');
    }

    let url = this.endpoints[endpointLabel];

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
