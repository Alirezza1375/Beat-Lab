import React from "react";
import { useAuthContext } from "../context/AuthContextProvider";

function Navbar() {
  const { user, token, setUser, setToken } = useAuthContext();

  function logOut() {
    setToken(undefined);
    setUser(undefined);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/" className="logo-link">
          BeatLab
        </a>
      </div>
      <ul className="navbar-links">
        <li>
          <a
            href="/courses"
            rel="noopener noreferrer"
            target="_blank"
            className="nav-link"
          >
            Courses
          </a>
        </li>
        <li>
          <a
            href="/blog"
            rel="noopener noreferrer"
            target="_blank"
            className="nav-link"
          >
            Blog
          </a>
        </li>
        <li>
          <a
            href="/about"
            rel="noopener noreferrer"
            target="_blank"
            className="nav-link"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/contact"
            rel="noopener noreferrer"
            target="_blank"
            className="nav-link"
          >
            Contact
          </a>
        </li>
      </ul>
      {token && user ? (
        <button onClick={logOut}>Log out</button>
      ) : (
        <div className="navbar-auth">
          <a
            href="/login"
            target="_blank"
            rel="noopener noreferrer"
            className="auth-link"
          >
            Login
          </a>
          <span className="auth-separator">/</span>
          <a
            href="/signup-form"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            Sign Up
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
