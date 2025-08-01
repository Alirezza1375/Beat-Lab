import React from "react";
import { useAuthContext } from "../context/AuthContextProvider";
import { useState } from "react";

function Navbar() {
  const { user, token, setUser, setToken } = useAuthContext();
  const [showMobileNav, setShowMobileNav] = useState(false);

  function logOut() {
    setToken(undefined);
    setUser(undefined);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <nav className="navbar relative">
      <div className="navbar-logo">
        <a href="/" className="logo-link">
          BeatLab
        </a>
      </div>
      <ul
        className={`navbar-links ${showMobileNav ? "show-navbar-links" : ""}`}
      >
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
        <div></div>
      ) : (
        <div
          className={`navbar-auth ${showMobileNav ? "show-navbar-links" : ""}`}
        >
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
      <button onClick={() => setShowMobileNav(!showMobileNav)}>
        <img
          src="/images/burger.svg"
          alt=""
          style={{
            color: "black",
            zIndex: "100",
            position: "absolute",
            top: "20px",
            right: "10px",
            height: "30px",
            width: "30px",
            cursor: "pointer",
          }}
          className="md:hidden"
        />
      </button>
    </nav>
  );
}

export default Navbar;
