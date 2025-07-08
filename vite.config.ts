import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { imagetools } from 'vite-imagetools'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), imagetools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@fonts': path.resolve(__dirname, './src/fonts'),
      '@components': path.resolve(__dirname, './src/components'),
      animejs: 'animejs/lib/anime.min.js',
    },
  },
})
