import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 根目录只用于开发时的辅助，不进行构建
export default defineConfig({
  plugins: [vue()],
})
