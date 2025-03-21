import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/frontend/',
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
      },
    },
  },


})
