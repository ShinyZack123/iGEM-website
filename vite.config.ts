import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/city-of-london-uk/',
  plugins: [react()],
})
