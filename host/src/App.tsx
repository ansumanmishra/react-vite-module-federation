import { lazy, Suspense } from "react";
import { loadRemote } from "@module-federation/runtime";

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
      Hello from host
      <Suspense fallback={<div>Loading remote...</div>}>
        <RemoteApp />
      </Suspense>
    </>
  );
}

export default App;
