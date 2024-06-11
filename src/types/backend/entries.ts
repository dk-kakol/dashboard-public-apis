import type { z } from 'zod';
import type {
  entrySchema,
  entriesSchema,
  entriesResponseSchema
} from '@/services/http/schemas/entries';

export type Entry = z.infer<typeof entrySchema>;

export type EntryKeys = keyof Entry;

export type Entries = z.infer<typeof entriesSchema>;

export type EntriesResponse = z.infer<typeof entriesResponseSchema>;

export type FetchApisParams = {
  offset?: number;
  limit?: number;
};
