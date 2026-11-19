import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Tailwind CSS v4 is configured 100% through this Vite plugin.
// Config lives in src/index.css (`@import "tailwindcss";` + `@theme { ... }`).
// There is intentionally no tailwind.config.js / postcss.config.js.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
