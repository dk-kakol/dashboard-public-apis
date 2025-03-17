import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'
import { templateCompilerOptions } from '@tresjs/core'
import legacy from '@vitejs/plugin-legacy'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true
      },
      ...templateCompilerOptions
    }),
    vuetify({
      autoImport: true,
      styles: { configFile: 'src/assets/vuetify/settings.scss' }
    }),
    svgLoader({ svgo: false }),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    vueDevTools()
  ],
  server: {
    host: '0.0.0.0',
    port: 7000
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
