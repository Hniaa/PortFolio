import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Remplace 'mon-portfolio-pixel' par le NOM EXACT de ton repo GitHub
export default defineConfig({
  plugins: [react()],
  base: '/PortFolio/', 
})