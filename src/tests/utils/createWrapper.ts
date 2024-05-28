import { VueWrapper, mount, type MountingOptions } from '@vue/test-utils';
import { defineComponent, type Component } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import i18n from '@/plugins/i18n';
import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { orphans } from '@/directives/orphans/orphans';

const vuetify = createVuetify({
  components,
  directives
});

global.ResizeObserver = require('resize-observer-polyfill');

export default <Params, Data>(
  componentToMount: Component,
  options?: MountingOptions<Params, Data>,
  piniaConfig?: TestingOptions
): VueWrapper => {
  const WrapperComponent = defineComponent({
    template: `
      <v-layout>
        <Suspense>
          <componentToMount v-bind="$attrs">
            <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
              <slot :name="slot" v-bind="scope || {}"/>
            </template>
          </componentToMount>
        </Suspense>
      </v-layout>`
  });

  const wrapper = mount(WrapperComponent, {
    global: {
      components: {
        componentToMount
      },
      plugins: [vuetify, i18n, createTestingPinia(piniaConfig)],
      mocks: { ...options?.global?.mocks },
      stubs: {
        'router-link': true,
        'router-view': true,
        'expand-transition': {
          template: '<div><slot /></div>'
        }
      },
      directives: {
        Orphans: orphans
      }
    },
    props: { ...options?.props },
    slots: { ...options?.slots }
  });

  return wrapper;
};
