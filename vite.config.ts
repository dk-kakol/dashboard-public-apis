import { fileURLToPath, URL } from 'node:url'

import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    vuetify({
      autoImport: true,
      styles: { configFile: 'src/assets/vuetify/settings.scss' },
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),],
  server: {
    host: true,
    port: 8000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
