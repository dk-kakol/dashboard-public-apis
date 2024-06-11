import { z } from 'zod';
import { authSchema, corsSchema, categorySchema } from '@/services/http/schemas/resources';

export const entrySchema = z.object({
  id: z.string(),
  API: z.string(),
  Description: z.string(),
  Auth: authSchema,
  HTTPS: z.boolean(),
  Cors: corsSchema,
  Link: z.string(),
  Category: categorySchema
});

export const entriesSchema = z.array(entrySchema);

export const entriesResponseSchema = z.object({
  count: z.number(),
  entries: entriesSchema
});
