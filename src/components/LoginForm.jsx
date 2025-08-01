import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [res, setRes] = useState("");
  const navigate = useNavigate();

  const { setToken, setUser } = useAuthContext();

  async function handleLogin(e) {
    e.preventDefault();

    const payload = {
      identifier,
      password,
    };

    const response = await fetch("https://beatlab-backend.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      console.log("Login successful", data);
      navigate("/admin-dashboard");
    } else {
      console.error("Login failed", data.message);
      setRes("error");
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

        {res?.startsWith("error") && (
          <div>
            <h5 className="font-bold text-black p-2 rounded">
              Failed to login!
            </h5>
            <span className="text-[12px]">
              Try to use correct username and password!
            </span>
          </div>
        )}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
