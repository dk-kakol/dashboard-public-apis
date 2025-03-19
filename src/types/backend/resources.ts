import type { z } from 'zod'
import type {
  authSchema,
  authResourceSchema,
  authResoucesSchema,
  categorySchema,
  categoryResourceSchema,
  categoriesResourceSchema,
  corsSchema,
  corsResourceSchema,
  corsResourcesSchema,
  permissionSchema,
  permissionResourceSchema,
  permissionResourcesSchema,
  resourcesSchema
} from '@/schemas'

export type Auth = z.infer<typeof authSchema>

export type AuthResource = z.infer<typeof authResourceSchema>

export type AuthResouces = z.infer<typeof authResoucesSchema>

export type Category = z.infer<typeof categorySchema>

export type CategoryResource = z.infer<typeof categoryResourceSchema>

export type CategoriesResource = z.infer<typeof categoriesResourceSchema>

export type Cors = z.infer<typeof corsSchema>

export type CorsResource = z.infer<typeof corsResourceSchema>

export type CorsResources = z.infer<typeof corsResourcesSchema>

export type Permission = z.infer<typeof permissionSchema>

export type PermissionResource = z.infer<typeof permissionResourceSchema>

export type PermissionResources = z.infer<typeof permissionResourcesSchema>

export type Resources = z.infer<typeof resourcesSchema>
