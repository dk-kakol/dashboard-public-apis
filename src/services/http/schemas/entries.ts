import { z } from 'zod'
// import { Cors, Auth } from '@/types';

// export const entrySchema = z.object({
//   API: z.string(),
//   Description: z.string(),
//   Auth: z.nativeEnum(Auth),
//   HTTPS: z.boolean(),
//   Cors: z.nativeEnum(Cors),
//   Link: z.string(),
//   Category: z.string(),
// });

export const entrySchema = z.object({
  API: z.string(),
  Description: z.string(),
  Auth: z.enum(["apiKey", "", "OAuth", "User-Agent", "X-Mashape-Key"]),
  HTTPS: z.boolean(),
  Cors: z.enum(["no", "unknown", "unkown", "yes"]),
  Link: z.string(),
  Category: z.string(),
});

export const entriesSchema = z.array(entrySchema);

export const entriesResponseSchema = z.object({
  count: z.number(),
  entries: entriesSchema
});