import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcss from 'rollup-plugin-postcss';

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})
