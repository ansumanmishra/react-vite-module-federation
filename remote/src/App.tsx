import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('count', count);
  }, [count]);

  return (
    <>
    <div style={{ padding: "20px", color: "#666", border: "1px solid #666", borderRadius: "10px", margin: "10px", backgroundColor: "#f0f0f0" }}>
      <h1>From Remote</h1>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>Count: {count}</p>
    </div>
    </>
  );
}

export default App;
