import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>College Portal Login</h1>
      <p>Select login type:</p>
      <button onClick={() => navigate("/student")}>Login as Student</button>
      <button onClick={() => navigate("/staff")} style={{ marginLeft: "10px" }}>
        Login as Staff
      </button>
    </div>
  );
}
