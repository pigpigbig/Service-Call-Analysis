import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Needed for GitHub Pages under /Service-Call-Analysis/
  base: '/Service-Call-Analysis/',
  plugins: [react()],
})
