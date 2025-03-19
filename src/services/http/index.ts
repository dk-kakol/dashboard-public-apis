import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import responseInterceptor from '@/composables/responseInterceptor/responseInterceptor'

/**
 * @class Http Class is an axios service for application.
 */
class Http {
  private static instance: Http
  axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      headers: { 'Content-type': 'application/json;charset=UTF-8' },
      // przetestować:
      timeout: 5000,
      signal: new AbortController().signal
    })
    this.axios.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => response,
      responseInterceptor
    )
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * @returns {Http} The singleton instance of the Http class.
   */
  public static getInstance(): Http {
    if (!Http.instance) {
      Http.instance = new Http()
    }
    return Http.instance
  }

  /**
   * @returns The `axios` instance is being returned.
   */
  getAxiosInstance(): AxiosInstance {
    return this.axios
  }

  /**
   * HTTP GET method, used to fetch data.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {AxiosRequestConfig} config - axios request configuration.
   * @returns {Promise<R>} HTTP `axios` response payload.
   */
  get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.axios.get(url, config)
  }

  /**
   * HTTP POST method, used to send data.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template B - `BODY`: body request object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {B} data - payload to be send as the `request body`,
   * @param {AxiosRequestConfig} config - axios request configuration.
   * @returns {Promise<R>} - HTTP `axios` response payload.
   * @memberof Api
   */
  post<T, B, R = AxiosResponse<T>>(url: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
    return this.axios.post(url, data, config)
  }
}

export default Http.getInstance
