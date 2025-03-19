import responseInterceptor from '@/composables/responseInterceptor/responseInterceptor'
import type { AxiosError } from 'axios'

describe('responseInterceptor', () => {
  it('should reject passed error', () => {
    const errorMessage = 'Error message'
    const error = new Error(errorMessage) as AxiosError

    return expect(responseInterceptor(error)).rejects.toEqual(error)
  })
})
