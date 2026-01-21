import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    federation({
      name: "host-container",
      filename: "host-container/remoteEntry.js",
      shared: {
        react: {
          singleton: true,
          requiredVersion: "19.2.3",
          strictVersion: false,
          shareScope: "default",
          version: "19.2.3",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "19.2.3",
          strictVersion: false,
          shareScope: "default",
          version: "19.2.3",
        },
      },
    }),
  ],
  server: {
    port: 5000,
  },
})
