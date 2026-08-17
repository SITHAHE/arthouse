import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' — относительные пути, сборка работает и в корне своего домена,
// и в подпапке GitHub Pages. Так же сделано в wigitel и karelskie-zori.
// Жёсткое '/arthouse/' стояло здесь до 17.08.2026 и означало, что на своём
// домене сайт откроется белым: все ассеты уехали бы в /arthouse/assets/.
// Шрифты лежат в src/fonts и проходят через сборщик, поэтому переезд
// между корнем и подпапкой их не ломает.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: { port: 5203, strictPort: false },
})
