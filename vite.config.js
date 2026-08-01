import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ЗАПОЛНИ ПОД ПРОЕКТ: base = '/<имя-репозитория>/' для GitHub Pages.
// Для своего домена или Vercel/Netlify оставь '/'.
export default defineConfig({
  base: '/arthouse/',
  plugins: [react(), tailwindcss()],
  server: { port: 5203, strictPort: false },
})
