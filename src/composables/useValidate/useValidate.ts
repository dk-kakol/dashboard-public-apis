import { ref } from 'vue'
import { ZodError, type ZodSchema } from 'zod'

export function useValidate(data: unknown, schema: ZodSchema) {
  const parsedData = ref<unknown>()
  const validationError = ref<ZodError>()

  async function parseData(data: unknown) {
    try {
      parsedData.value = schema.parse(data)
    } catch (error) {
      parsedData.value = data
      if (error instanceof ZodError) validationError.value = error
      console.error(error)
    }
  }

  parseData(data)

  return {
    parsedData,
    validationError
  }
}
