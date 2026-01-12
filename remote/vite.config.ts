import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote",
      filename: "remoteApp/remoteEntry.js",
      exposes: {
        "./RemoteApp": "./src/App.tsx",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "19.2.0",
          strictVersion: false,
          shareScope: "default",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "19.2.0",
          strictVersion: false,
          shareScope: "default",
        },
      },
    }),
  ],
});
