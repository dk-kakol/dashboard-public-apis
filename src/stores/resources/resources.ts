import { defineStore } from 'pinia'
import { computed } from 'vue'
import ResourcesService from '@/services/http/api/resources'
import type {
  Maybe,
  AuthResouces,
  CategoriesResource,
  CorsResources,
  PermissionResources
} from '@/types'

export const useResourcesStore = defineStore('resources', () => {
  const {
    parsedData: getResources,
    execute: fetchResources,
    isLoading: isResourcesLoading
  } = ResourcesService.fetchResources()

  const getAuthResources = computed<Maybe<AuthResouces>>(() => getResources.value?.auth)

  const getCategoriesResources = computed<Maybe<CategoriesResource>>(
    () => getResources.value?.categories
  )

  const getCorsResources = computed<Maybe<CorsResources>>(() => getResources.value?.cors)

  const getPermissionsResources = computed<Maybe<PermissionResources>>(
    () => getResources.value?.permissions
  )

  return {
    isResourcesLoading,
    getResources,
    getAuthResources,
    getCategoriesResources,
    getCorsResources,
    getPermissionsResources,
    fetchResources
  }
})
