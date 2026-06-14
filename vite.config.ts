import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative Pfade, damit die Seite auch unter github.io/<repo>/ funktioniert
  base: './',
  plugins: [react(), tailwindcss()],
})
