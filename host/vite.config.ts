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
      remotes: {
        remote: {
          type: "module",
          name: "remote",
          entry: "http://localhost:5173/remoteApp/remoteEntry.js",
          entryGlobalName: "remoteApp",
          shareScope: "default",
        },
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
