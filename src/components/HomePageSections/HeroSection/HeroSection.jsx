import React from "react";

import drumSetBackground from "/src/assets/images/drum-set-images/drum-set-pic.jpg";

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage: `url(${drumSetBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-50 z-0"></div>

      {/* Foreground Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Master the Drums, Step by Step.
          </h1>
          <p className="text-lg sm:text-xl mb-8 font-semibold">
            From your first beat to advanced solos, Beat_Lab is your all-in-one
            space to learn, practice, and grow as a drummer.
          </p>
          <a
            href="/courses"
            className="bg-[#2a6496] text-white px-6 py-3 rounded-md hover:bg-[#1a4a70] transition"
          >
            Start Learning Now
          </a>
        </div>
      </div>
    </section>
  );
}
