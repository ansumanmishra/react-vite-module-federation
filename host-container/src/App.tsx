import { loadRemote } from '@module-federation/runtime'
import { lazy, Suspense } from 'react'
import './App.css'

const HostApp = lazy(async () => {
  const module = await loadRemote<{ default: React.ComponentType }>(
    "host/HostApp"
  );
  if (!module) {
    throw new Error("Failed to load remote module");
  }
  return module;
});

function App() {

  return (
    <>
      <h1>From host container</h1>
      <Suspense fallback={<div>Loading remote...</div>}>
        <HostApp />
      </Suspense>
    </>
  )
}

export default App
