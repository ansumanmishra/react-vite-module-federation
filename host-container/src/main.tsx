import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerRemotes } from '@module-federation/runtime'

// Register the remote dynamically
registerRemotes([
  {
    type: "module",
    name: "host",
    entry: "http://localhost:7000/host/remoteEntry.js",
    entryGlobalName: "remote",
    shareScope: "default",
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
