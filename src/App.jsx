import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import SignupForm from "./components/SignUpForm.jsx";
import BeatMachine from "./components/Beatmachine/BeatMachine.jsx";
import "./App.css";
import EditBeatMachine from "./components/Beatmachine/EditBeatMachine.jsx";
import Beats from "./components/Beats/Beats.jsx";

function App() {
  return (
    <Router>
      <div className="w-screen">
        <Navbar />
        <main className="p-[20px] text-center">
          <h1>Welcome to BeatLab</h1>

          <Routes>
            {/* Define the route for the signup form */}
            <Route path="/signup-form" element={<SignupForm />} />
            {/* You can add other routes here */}
            <Route path="/create-beat" element={<BeatMachine />} />
            <Route path="/beats" element={<Beats />} />
            <Route path="/beat/edit/:id" element={<EditBeatMachine />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
