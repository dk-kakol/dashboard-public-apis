import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import type { IconSize } from '@/types'

const iconsSize = (): IconSize => {
  const { smAndUp } = useDisplay()
  const result = computed<IconSize>(() => (smAndUp.value ? 'large' : 'small'))

  return result.value
}

export default iconsSize
