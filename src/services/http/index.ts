import axios from 'axios';
import type { Axios, AxiosResponse, AxiosRequestConfig } from 'axios';
import responseInterceptor from '@/composables/responseInterceptor';
/**
 * @class Http Class is an axios service for application.
 */
class Http {
  axios: Axios;

  constructor() {
    this.axios = axios.create({
      headers: { 'Content-type': 'application/json;charset=UTF-8' },
      // przetestować:
      timeout: 5000,
      signal: new AbortController().signal
    });
    this.axios.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => response,
      responseInterceptor
    );
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
    return this.axios.get(url, config);
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
    return this.axios.post(url, data, config);
  }
}

export default new Http();
