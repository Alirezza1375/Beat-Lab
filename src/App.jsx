import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import SignupForm from "./components/SignUpForm.jsx";
import BeatMachine from "./components/Beatmachine/BeatMachine.jsx";
import "./App.css";
import EditBeatMachine from "./components/Beatmachine/EditBeatMachine.jsx";
import Beats from "./components/Beats/Beats.jsx";
import Home from "./components/Pages/Home/Home.jsx";
import Courses from "./components/Pages/Courses/Courses.jsx";
import Blog from "./components/Pages/Blog/Blog.jsx";
import About from "./components/Pages/About/About.jsx";
import Contact from "./components/Pages/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <Router>
      <div className="w-screen min-h-screen flex flex-col">
        <header>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </header>

        <main className="p-[20px] text-center flex flex-col items-center flex-grow">
          <Routes>
            <Route path="/create-beat" element={<BeatMachine />} />
            <Route path="/beats" element={<Beats />} />
            <Route path="/beat/edit/:id" element={<EditBeatMachine />} />
            <Route path="/signup-form" element={<SignupForm />} />
          </Routes>
        </main>

        <footer className="bg-[#2a6496] text-gray-400 text-sm py-7 px-4">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
