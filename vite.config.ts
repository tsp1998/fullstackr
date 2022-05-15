import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: process.env.NODE_ENV === 'development',
            },
          ],
        ],
      },
    }),
  ],
  build: {
    outDir: 'build',
  },
  esbuild: {
    exclude: [/node_modules_cra/, /node_modules/]
  },
  server: {
    watch: {
      ignored: [/node_modules_cra/, /node_modules/]
    }
  }
})
