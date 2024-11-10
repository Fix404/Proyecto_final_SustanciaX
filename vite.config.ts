import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige las solicitudes al backend
      '/api': {
        target: 'http://190.221.207.224:8090/', // Reemplaza con tu URL del backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Opcional: elimina el prefijo /api
      },
    },
  },
})
