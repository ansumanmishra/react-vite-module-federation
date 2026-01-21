import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      filename: "host/remoteEntry.js",
      exposes: {
        "./HostApp": "./src/App.tsx",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^19.2.0",

        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.2.0",
        },
      },
    }),
  ],
  server: {
    port: 7000,
  },
});
