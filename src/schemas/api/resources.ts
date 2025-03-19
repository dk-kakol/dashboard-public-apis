import { z } from 'zod'

export const authSchema = z.enum(['apiKey', '', 'OAuth', 'User-Agent', 'X-Mashape-Key'])

export const authResourceSchema = z.object({
  id: z.string(),
  name: authSchema
})

export const authResoucesSchema = z.array(authResourceSchema)

export const categorySchema = z.string()

export const categoryResourceSchema = z.object({
  id: z.string(),
  name: categorySchema
})

export const categoriesResourceSchema = z.array(categoryResourceSchema)

export const corsSchema = z.enum(['no', 'unknown', 'yes'])

export const corsResourceSchema = z.object({
  id: z.string(),
  name: corsSchema
})

export const corsResourcesSchema = z.array(corsResourceSchema)

export const permissionSchema = z.enum(['addApiEntry', 'manageApiEntry', 'manageUsers'])

export const permissionResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish()
})

export const permissionResourcesSchema = z.array(permissionResourceSchema)

export const resourcesSchema = z.object({
  auth: authResoucesSchema,
  categories: categoriesResourceSchema,
  cors: corsResourcesSchema,
  permissions: permissionResourcesSchema
})
