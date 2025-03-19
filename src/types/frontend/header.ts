import type { RouteLocationRaw } from 'vue-router'

export interface NavigationDrawerListItem {
  title: string
  route: RouteLocationRaw
}

export type ThemeName = 'light' | 'dark'
