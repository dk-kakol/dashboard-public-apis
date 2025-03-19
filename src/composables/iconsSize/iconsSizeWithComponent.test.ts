import { defineComponent } from 'vue'
import iconsSize from '@/composables/iconsSize/iconsSize'
import { useDisplay } from 'vuetify'
import { createWrapper } from '@/tests/utils'

// unmock modules defind in setupFiles:
vi.unmock('vuetify')

describe('iconsSize', () => {
  it('should return small if display is smaller than smAndUp. Test in component', () => {
    const TestComponent = defineComponent({
      template: '<v-layout></v-layout>',
      setup() {
        const { smAndUp } = useDisplay()
        smAndUp.value = false
        const result = iconsSize()
        return { result, test }
      }
    })

    const wrapper = createWrapper(TestComponent).findComponent(TestComponent)

    expect(wrapper.vm.result).toBe('small')
  })
})
