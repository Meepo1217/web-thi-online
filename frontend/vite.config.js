import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-router-dom': path.resolve(__dirname, './src/shims/react-router-dom.jsx'),
      'axios': path.resolve(__dirname, './src/shims/axios.js'),
    }
  }
})
