import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Le nom de ton dépôt GitHub, indispensable pour le déploiement sur gh-pages
  base: '/PortFolio/', 
})