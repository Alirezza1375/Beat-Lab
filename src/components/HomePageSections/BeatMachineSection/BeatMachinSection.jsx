import React from "react";
import beatMachineBackground from "/src/assets/images/drum-set-images/beat-machine-pic.jpg";

export default function BeatMachineSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage: `url(${beatMachineBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-50"></div>

      {/* Foreground Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            🎛 Try the Beat Machine
          </h2>
          <p className="text-lg sm:text-xl mb-8">
            Practice your rhythms and build custom beats with our interactive
            Beat Machine. It’s a fun, hands-on way to apply what you’re learning
            — right in your browser.
          </p>
          <a
            href="/create-beat"
            className="bg-[#2a6496] text-white px-6 py-3 rounded-md hover:bg-[#1a4a70] transition"
          >
            Launch Beat Machine
          </a>
        </div>
      </div>
    </section>
  );
}
