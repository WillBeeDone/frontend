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
        //для подключения к локальному БЕКу
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        //для подключения к диджитал оушн БЕКу
        //target: "https://monkfish-app-73239.ondigitalocean.app",
      },
    },
  },

})