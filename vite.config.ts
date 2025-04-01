import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        //target: "https://monkfish-app-73239.ondigitalocean.app",
      },
    },
  },

})
