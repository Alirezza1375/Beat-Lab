import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import SignupForm from "./components/SignUpForm.jsx";
import BeatMachine from "./components/Beatmachine/BeatMachine.jsx";
import "./App.css";

function App() {
  const [playing, setPlaying] = useState(false);
  const handleStopBeat = () => {
    setPlaying(false);
  };

  return (
    <Router>
      <div className="w-screen">
        <Navbar />
        <main className="p-[20px] text-center">
          <h1>Welcome to BeatLab</h1>
          <BeatMachine
            playing={playing}
            setPlaying={setPlaying}
            handleStopBeat={handleStopBeat}
          />
          <Routes>
            {/* Define the route for the signup form */}
            <Route path="/signup-form" element={<SignupForm />} />
            {/* You can add other routes here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
