import { h } from 'vue'
import StoryWrapper from './StoryWrapper.vue'

export const DEFAULT_THEME = 'light'
export const DEFAULT_LOCALE = 'en'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withVuetifyTheme = (storyFn: any, context: any) => {
  const themeName = context.globals.theme || DEFAULT_THEME
  const localeName = context.globals.locale || DEFAULT_LOCALE
  const story = storyFn()

  return () => {
    return h(StoryWrapper, { themeName, localeName } as typeof StoryWrapper.props, {
      story: () => h(story, { ...context.args })
    })
  }
}
