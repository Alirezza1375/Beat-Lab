import React, { useState } from "react";

function SignupForm() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("beginner");
  const [password, setPassword] = useState("");
  const [res, setRes] = useState("");

  async function handleRegisterUser(e) {
    e.preventDefault();

    const userInfoToSend = {
      username: username,
      email: email,
      level: level,
      password: password,
    };

    console.log(userInfoToSend, "userInfo");

    const userName = `${username}`;
    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        body: JSON.stringify(userInfoToSend),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setRes(`success:${userName}`);
      } else {
        setRes(`error:${userName}`);
      }

      setUserName("");
      setEmail("");
      setLevel("beginner");
      setPassword("");
    } catch (error) {
      console.error("Registration failed:", error);
      setRes(`error:${userName}`);
    }
  }

  return (
    <div className="signup-form">
      <h2 className="mb-2.5">Sign Up</h2>
      <form onSubmit={handleRegisterUser}>
        <div>
          <label>Userame:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Level:</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
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
        {res?.startsWith("success") && (
          <div>
            <h5 className="text-black p-2 rounded">
              {`${res.split(":")[1]} registered successfully.`}
            </h5>
            <span className="text-[12px]">Close this tab</span>
          </div>
        )}
        {res?.startsWith("error") && (
          <div>
            <h5 className="font-bold text-black p-2 rounded">
              {`Failed to register ${res.split(":")[1]}.`}
            </h5>
            <span className="text-[12px]">Try again!</span>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignupForm;
