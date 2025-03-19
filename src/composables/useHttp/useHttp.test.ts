import axios from 'axios'
import { ref } from 'vue'
import { z } from 'zod'
import mapValues from 'lodash.mapvalues'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useHttp } from '@/composables/useHttp/useHttp'
import { ApiEndpoints } from '@/types'

const instance = axios.create({
  baseURL: '/api'
})

const composableArgs = {
  endpoint: ApiEndpoints.resources,
  routeParams: { testRouteParams: 'test' },
  config: { method: 'POST' },
  instance: instance,
  options: { immediate: true },
  responseSchema: z.string()
}

const useAxiosMockedData = {
  data: 'axiosResponseData',
  response: 'axiosResponse',
  isFinished: true,
  isLoading: false,
  isAborted: false,
  isCanceled: false,
  error: new Error('Test Error'),
  execute: vi.fn(),
  abort: vi.fn(),
  cancel: vi.fn()
}

vi.mock('@vueuse/integrations/useAxios', () => {
  return {
    useAxios: vi.fn(() => mapValues(useAxiosMockedData, (val: unknown) => ref(val)))
  }
})

describe('Composable useHttp', () => {
  it('should call useAxios composable', () => {
    useHttp(composableArgs)

    expect(useAxios).toHaveBeenCalledTimes(1)
  })

  it('should return data and undefined parsedData when no schema is given', () => {
    const { data, parsedData } = useHttp({
      ...composableArgs,
      responseSchema: undefined
    })

    expect(data.value).toBe(useAxiosMockedData.data)
    expect(parsedData.value).toBeUndefined()
  })

  it('should return data and parsedData when schema is given', () => {
    const { data, parsedData } = useHttp(composableArgs)

    expect(data.value).toBe(useAxiosMockedData.data)
    expect(parsedData.value).toBe(composableArgs.responseSchema.parse(useAxiosMockedData.data))
  })

  it('should return validationError if response is not matching expected schema', () => {
    const { validationError } = useHttp({
      ...composableArgs,
      responseSchema: z.number()
    })

    expect(validationError.value).toBeDefined()
    expect(validationError.value).toBeInstanceOf(z.ZodError)
  })

  it('should return all data from useAxios composable', () => {
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
    } = useHttp(composableArgs)

    expect(data.value).toBeDefined()
    expect(response.value).toBeDefined()
    expect(isFinished.value).toBeDefined()
    expect(isLoading.value).toBeDefined()
    expect(isAborted.value).toBeDefined()
    expect(isCanceled.value).toBeDefined()
    expect(error).toBeDefined()
    expect(execute).toBeDefined()
    expect(abort).toBeDefined()
    expect(cancel).toBeDefined()
  })
})
