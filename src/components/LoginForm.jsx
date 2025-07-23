import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setToken, setUser } = useAuthContext();

  async function handleLogin(e) {
    e.preventDefault();

    const payload = {
      identifier,
      password,
    };

    console.log(payload);

    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);
      setToken(data.token);
      setUser(data.user);
      console.log("Login successful", data);
      navigate("/create-beat");
    } else {
      console.error("Login failed", data.message);
    }
  }

  return (
    <div className="login-form">
      <h2 className="mb-2.5">Log In</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Userame/email:</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
