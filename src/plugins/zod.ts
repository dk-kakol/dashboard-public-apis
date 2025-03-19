import { z, ZodString, ZodEffects } from 'zod'

function excludeSpecialRefine(this: ZodString): ZodEffects<ZodString, string, string> {
  return this.refine((data: string) => /^[^<>`{}=]*$/i.test(data), {
    params: { i18n: 'excludeSpecial' }
  })
}

Object.defineProperty(ZodString.prototype, 'excludeSpecialRefine', {
  value: excludeSpecialRefine,
  writable: true,
  configurable: true
})

export { z }
