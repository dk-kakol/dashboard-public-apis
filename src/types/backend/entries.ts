import type { z } from 'zod'
import type { entrySchema, entryKeySchema, entriesSchema, entriesResponseSchema } from '@/schemas'

export type Entry = z.infer<typeof entrySchema>

export type EntryKeys = z.infer<typeof entryKeySchema>

export type Entries = z.infer<typeof entriesSchema>

export type EntriesResponse = z.infer<typeof entriesResponseSchema>

export type FetchApisParams = {
  offset?: number
  limit?: number
  search?: string
  category?: string
  auth?: string
  cors?: string
}
