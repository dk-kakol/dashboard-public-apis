import type { EndpointParams, ApiEndpoints } from '@/types'
class Endpoints {
  private static instance: Endpoints
  apiPrefix: string

  constructor() {
    this.apiPrefix = import.meta.env.VITE_APP_API_URL
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * @returns {Endpoints} The singleton instance of the Endpoints class.
   */
  public static getInstance(): Endpoints {
    if (!Endpoints.instance) {
      Endpoints.instance = new Endpoints()
    }
    return Endpoints.instance
  }

  get(endpointLabel: ApiEndpoints, params?: EndpointParams): string {
    let url = endpointLabel as string

    if (typeof params === 'object') {
      Object.keys(params).forEach((param) => {
        url = url.replace(`:${param}`, params[param])
      })
    } else if (url.indexOf('/:') > 0) {
      url = url.substring(0, url.indexOf('/:'))
    }

    return this.apiPrefix.concat(url)
  }
}

export default Endpoints.getInstance
