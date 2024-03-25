import type { z } from 'zod'
import type { entrySchema, entriesSchema, entriesResponseSchema } from '@/services/http/schemas/entries';

export enum Cors {
    No = "no",
    Unknown = "unknown",
    Unkown = "unkown",
    Yes = "yes",
}

export enum Auth {
    APIKey = "apiKey",
    Empty = "",
    OAuth = "OAuth",
    UserAgent = "User-Agent",
    XMashapeKey = "X-Mashape-Key",
}

export type Entry = z.infer<typeof entrySchema>;

export type EntryKeys = keyof Entry;

export type Entries = z.infer<typeof entriesSchema>;

export type EntriesResponse = z.infer<typeof entriesResponseSchema>;
