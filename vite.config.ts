import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'

// GitHub Pages serves this project site from /<repo>/, so the built assets
// need that prefix. Locally the site is served from the root.
export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? '/urogynec/' : '/',
  plugins: [vue(), tailwindcss(), imagetools()],
}))
