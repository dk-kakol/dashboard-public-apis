import type { InferType } from 'yup';
import type { entrySchema, entriesResponseSchema } from '@/services/http/schemas/entries';

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

export interface Entry extends InferType<typeof entrySchema>{};

export interface EntriesResponse extends InferType<typeof entriesResponseSchema>{};
