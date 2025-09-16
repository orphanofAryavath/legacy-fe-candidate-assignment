import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [backendMsg, setBackendMsg] = useState("Loading...");

  useEffect(() => {
    // call backend
    axios
      .get("http://localhost:8080/") // backend endpoint
      .then((res) => setBackendMsg(res.data.message))
      .catch((err) => setBackendMsg("❌ Could not reach backend"));
  }, []);

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
        marginTop: "50px",
      }}>
      <h1>Frontend is running ✅</h1>
      <p>
        Backend says: <b>{backendMsg}</b>
      </p>
    </div>
  );
}

export default App;
