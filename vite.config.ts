import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://190.221.207.224:8090',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')  // Remueve '/api' del path al enviar la solicitud
      }
    }
  }
})
