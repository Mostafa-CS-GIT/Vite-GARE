import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['filling-mil-detroit-affiliated.trycloudflare.com'],
    proxy: {
      '/api': {
        target: 'https://white-seahorse-266682.hostingersite.com',
        changeOrigin: true,
        secure: false,
      },
      '/api-docs': 'http://localhost:4000',
    },
  },
  preview: {
    host: '0.0.0.0',
  },
})