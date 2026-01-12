import { lazy, Suspense } from "react";
import { loadRemote } from "@module-federation/runtime";
import "./App.css";

const RemoteApp = lazy(async () => {
  const module = await loadRemote<{ default: React.ComponentType }>(
    "remote/RemoteApp"
  );
  if (!module) {
    throw new Error("Failed to load remote module");
  }
  return module;
});

function App() {
  return (
    <>
      <div className="host">
        <h1>From host</h1>
        <Suspense fallback={<div>Loading remote...</div>}>
          <RemoteApp />
        </Suspense>
      </div>
    </>
  );
}

export default App;
