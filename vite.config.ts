import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      // ✅ API 反向代理設定
      '/api': {
        target: 'http://192.168.51.231:10811',
        changeOrigin: true, // 模擬同源
        rewrite: (path) => path.replace(/^\/api/, '') // 去掉前綴 /api
      }
    }
  }
})