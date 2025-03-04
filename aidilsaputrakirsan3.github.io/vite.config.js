import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/aidilsaputrakirsan3.github.io/', // Ubah ini ke '/' karena kita menggunakan domain utama
})