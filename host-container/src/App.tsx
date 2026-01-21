import { loadRemote } from '@module-federation/runtime'
import { lazy, Suspense, useEffect, useState } from 'react'
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
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('count', count);
  }, [count]);

  return (
    <>
      <div style={{ padding: "20px", color: "#666", border: "1px solid #666", borderRadius: "10px", margin: "10px", backgroundColor: "#f0f0f0", width: "800px", height: "800px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
        <h1>From host container</h1>
        <button onClick={() => setCount(count + 1)}>Click me</button>
        <p>Count: {count}</p>
      <Suspense fallback={<div>Loading remote...</div>}>
        <HostApp />
      </Suspense>
    </div>
    </>
  )
}

export default App
