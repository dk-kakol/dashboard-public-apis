import { object, number, string, boolean, mixed, array } from 'yup';
import { Cors, Auth } from '@/types';

export const entrySchema = object({
  api: string().required(),
  description: string().required(),
  auth: mixed<Auth>().oneOf(Object.values(Auth)).defined(),
  https: boolean().defined(),
  cors: mixed<Cors>().oneOf(Object.values(Cors)).defined(),
  link: string().required(),
  category: string().required(),
});

export const entriesResponseSchema = object({
  count: number(),
  entries: array(entrySchema).required(),
});