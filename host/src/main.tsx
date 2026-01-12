import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerRemotes } from "@module-federation/runtime";
import "./index.css";
import App from "./App.tsx";

// Register the remote dynamically
await registerRemotes([
  {
    type: "module",
    name: "remote",
    entry: "http://localhost:5173/remoteApp/remoteEntry.js",
    entryGlobalName: "remote",
    shareScope: "default",
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
