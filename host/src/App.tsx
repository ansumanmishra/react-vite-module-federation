import { lazy, Suspense, Component, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { loadRemote, registerRemotes } from "@module-federation/runtime";
import "./App.css";


registerRemotes([
  {
    type: "module",
    name: "remote",
    entry: "http://localhost:8000/remoteApp/remoteEntry.js",
    entryGlobalName: "remote",
    shareScope: "default",
  },
]);

// Error Boundary component
class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error loading remote module:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const RemoteApp = lazy(async () => {
  try {
    const module = await loadRemote<{ default: React.ComponentType }>(
      "remote/RemoteApp"
    );
    if (!module) {
      throw new Error("Failed to load remote module");
    }
    return module;
  } catch (error) {
    console.error("Error loading remote module:", error);
    // Return a fallback component instead of throwing
    return {
      default: () => (
        <div style={{ padding: "20px", color: "#666" }}>
          Remote app is not available. Please ensure the remote server is running.
        </div>
      ),
    };
  }
});

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('count', count);
  }, [count]);

  return (
    <>
      <div style={{ padding: "20px", color: "#666", border: "1px solid black", borderRadius: "10px", margin: "10px", backgroundColor: "#f0f0f0", width: "500px", height: "500px" }}>
        <h1>From host</h1>
        <button onClick={() => setCount(count + 1)}>Click me</button>
        <p>Count: {count}</p>
        <ErrorBoundary
          fallback={
            <div style={{ padding: "20px", color: "#666" }}>
              Remote app failed to load. Please ensure the remote server is running.
            </div>
          }
        >
          <Suspense fallback={<div>Loading remote...</div>}>
            <RemoteApp />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
