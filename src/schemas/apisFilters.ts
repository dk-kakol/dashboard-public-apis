import { z } from 'zod'

export const apisFiltersSchema = z.object({
  search: z.string().min(3)
})
