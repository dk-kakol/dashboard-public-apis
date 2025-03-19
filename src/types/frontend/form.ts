// import type { ZodSchema } from "zod";
import type { MaybeRef } from 'vue'
import type { RuleExpression } from 'vee-validate'

export type FormTextFieldProps = {
  name: string
  rules: MaybeRef<RuleExpression<unknown>>
  type: string
}
