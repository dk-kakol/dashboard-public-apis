/* eslint-disable @typescript-eslint/no-explicit-any */
import Endpoints from '@/services/http/endpoints'
import Http from '@/services/http/index'
import { ref, watch, type Ref } from 'vue'
import type { ApiEndpoints, EndpointParams } from '@/types'
import type { StrictUseAxiosReturn } from '@vueuse/integrations'
import { useAxios, type UseAxiosOptions } from '@vueuse/integrations/useAxios'
import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import type { ZodError, ZodSchema, infer as zInfer } from 'zod'
import { useValidate } from '@/composables/useValidate/useValidate'

const axiosInstance = Http().getAxiosInstance()

type Args<T extends ZodSchema, D = any> = {
  endpoint: ApiEndpoints
  routeParams?: EndpointParams
  config?: AxiosRequestConfig<D>
  instance?: AxiosInstance
  options?: UseAxiosOptions
  responseSchema?: T
}

type UseHttpReturn<T extends ZodSchema, R = AxiosResponse<T>, D = any> = StrictUseAxiosReturn<
  T,
  R,
  D
> & { parsedData: Ref<zInfer<T> | undefined>; validationError: Ref<ZodError<any> | undefined> }

/**
 * The `useHttp` composable  wraps the `useAxios` (VueUse) hook and provides
 * additional functionality for making HTTP requests, ex: zod validation.
 * @param {ApiEndpoints} endpoint - The `endpoint` parameter is the API endpoint string that you want to make a
 * request to.
 * @param {EndpointParams} [routeParams] - routeParams is an optional parameter that represents the route
 * parameters to be included in the HTTP request. Route parameters are dynamic parts of a URL that are
 * used to identify a specific resource.
 * @param config - The `config` parameter is an optional object that allows you to customize the Axios
 * request configuration. It includes properties such as `headers`, `params`, `timeout`, `auth`, and
 * more. You can pass any valid Axios request configuration options to this parameter.
 * @param instance - The `instance` parameter is an optional Axios instance that you can pass to the
 * `useHttp` function. It allows you to customize the Axios instance used for making HTTP requests. If
 * you don't provide a custom instance, the function will use the default Axios instance.
 * @param options - The `options` parameter is an object that allows you to configure the behavior of
 * the `useHttp` function. See: https://vueuse.org/integrations/useAxios/
 * @param {ZodSchema} responseSchema - The `responseSchema` parameter is a Zod schema to validate the response data.
 * @returns The function `useHttp` returns an object with the following properties: data, response,
 * isFinished, isLoading, isAborted, isCanceled, error, execute, abort, cancel
 * @template T - The type of the response data. This can be any type that matches the structure of the data you expect to receive from the API.
 * @template R - The type of the Axios response.
 * @template D - The type of the data in AxiosRequestConfig.
 */
export function useHttp<T extends ZodSchema, R = AxiosResponse<T>, D = any>(
  args: Args<T, D>
): UseHttpReturn<T, R, D> {
  const {
    data,
    response,
    isFinished,
    isLoading,
    isAborted,
    isCanceled,
    error,
    execute,
    abort,
    cancel
  } = useAxios<T, R, D>(
    Endpoints().get(args.endpoint, args?.routeParams),
    args?.config ?? {},
    args?.instance ?? axiosInstance,
    args?.options ?? { immediate: true }
  )

  const parsedData = ref<zInfer<T>>()
  const validationError = ref<ZodError>()
  watch(
    data,
    (value) => {
      if (!args.responseSchema) return
      if (!value) return
      const { parsedData: newData, validationError: newError } = useValidate(
        value,
        args.responseSchema
      )
      parsedData.value = newData.value
      validationError.value = newError.value
    },
    { immediate: true }
  )

  return {
    data,
    response,
    isFinished,
    isLoading,
    isAborted,
    isCanceled,
    error,
    execute,
    abort,
    cancel,
    parsedData,
    validationError
  }
}
