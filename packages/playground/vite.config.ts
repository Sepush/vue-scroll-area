import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue-scroll-area': resolve(import.meta.dirname, '../scroll-area/src/index.ts'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
