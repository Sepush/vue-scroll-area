import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'vue-scroll-area': resolve(__dirname, '../scroll-area/src/index.ts'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
