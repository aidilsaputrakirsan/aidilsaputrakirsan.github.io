import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Two pages, served natively by GitHub Pages (no SPA redirect hacks):
//   /        -> index.html        -> Myst Tech hub (all apps, Myst-Core)
//   /aidil/  -> aidil/index.html  -> founder profile, research & CV
export default defineConfig({
  plugins: [react()],
  base: '/', // domain utama (myst-tech.com)
  build: {
    // The only big chunk is three.js for the hub's 3D orbit — lazy-loaded
    // after first paint, so it never blocks the page.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        aidil: resolve(__dirname, 'aidil/index.html'),
      },
    },
  },
})
