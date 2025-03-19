import type { App } from 'vue'
import { orphans } from './orphans/orphans'

const initDirectives = (app: App): void => {
  app.directive('orphans', orphans)
}

export default initDirectives
