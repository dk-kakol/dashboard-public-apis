import type { AxiosError } from 'axios'

export default (error: AxiosError) => Promise.reject(error)
