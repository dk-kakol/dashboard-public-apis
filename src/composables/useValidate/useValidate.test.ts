import { z } from 'zod'
import { useValidate } from '@/composables/useValidate/useValidate'

const testSchema = z.string()
const validData = 'valid data'
const invalidData = 1

describe('Composable useValidate', () => {
  it('should return parsedData and validationError', () => {
    const { parsedData, validationError } = useValidate(validData, testSchema)

    expect(parsedData).toBeDefined()
    expect(validationError).toBeDefined()
  })

  it('should call passed schema`s parse method with passed data to check ', () => {
    const testSchemaParseSpy = vi.spyOn(testSchema, 'parse')
    useValidate(validData, testSchema)

    expect(testSchemaParseSpy).toBeCalledWith(validData)
  })

  it('should return ZodError in validationError on validation fail', () => {
    const { validationError } = useValidate(invalidData, testSchema)

    expect(validationError.value).toBeInstanceOf(z.ZodError)
  })

  it('should return passed data in parsedData on validation fail', () => {
    const { parsedData } = useValidate(invalidData, testSchema)

    expect(parsedData.value).toBe(invalidData)
  })

  it('validationError should be undefined if validation passed', () => {
    const { validationError } = useValidate(validData, testSchema)

    expect(validationError.value).toBeUndefined()
  })

  it('should return the result of schema`s parsed method in parsedData if validation passed', () => {
    const { parsedData } = useValidate(validData, testSchema)

    expect(parsedData.value).toBe(testSchema.parse(validData))
  })
})
