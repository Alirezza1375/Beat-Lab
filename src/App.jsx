import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import SignupForm from "./components/SignUpForm.jsx";
import BeatMachine from "./components/Beatmachine/BeatMachine.jsx";
import "./App.css";
import EditBeatMachine from "./components/Beatmachine/EditBeatMachine.jsx";
import Beats from "./components/Pages/Beats.jsx";
import Home from "./components/Pages/Home.jsx";
import Courses from "./components/Pages/Courses.jsx";
import Blog from "./components/Pages/Blog.jsx";
import About from "./components/Pages/About.jsx";
import Contact from "./components/Pages/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Pages from "./components/Pages/Pages.jsx";
import Texts from "./components/Pages/Texts.jsx";
import PageEdit from "./components/Pages/PageEdit.jsx";
import CreateText from "./components/CreateText.jsx";
import CreatePage from "./components/CreatePage.jsx";
import LoginForm from "./components/LogInForm.jsx";
import BeatMachineViewer from "./components/Beatmachine/BeatMachineViewer.jsx";
import Protected from "./components/Protected.jsx";
import AdminDashboard from "./components/Pages/AdminDashboard.jsx";

function App() {
  return (
    <Router>
      <div className="w-screen min-h-screen flex flex-col">
        <header>
          <Navbar />
        </header>

        <main className="p-[20px] text-center flex flex-col items-center flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup-form" element={<SignupForm />} />

            {/* Protected routes */}
            <Route element={<Protected />}>
              <Route path="/beat/edit/:id" element={<EditBeatMachine />} />
              <Route path="/beat/view/:id" element={<BeatMachineViewer />} />
              <Route path="/page/edit/:id" element={<PageEdit />} />
            </Route>
          </Routes>
        </main>

        <Routes>
          <Route element={<Protected />}>
            <Route path="/admin-dashboard/*" element={<AdminDashboard />}>
              <Route path="create-beat" element={<BeatMachine />} />
              <Route path="beats" element={<Beats />} />
              <Route path="create-text" element={<CreateText />} />
              <Route path="texts" element={<Texts />} />
              <Route path="create-page" element={<CreatePage />} />
              <Route path="pages" element={<Pages />} />
            </Route>
          </Route>
        </Routes>

        <footer className="bg-[#2a6496] text-gray-400 text-sm py-7 px-4">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
