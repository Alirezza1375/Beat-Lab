import React from "react";
import drumSetBackground from "/src/assets/images/drum-set-images/drum-set-pic.jpg";

export default function Home() {
  console.log(drumSetBackground);
  return (
    <div>
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
              From your first beat to advanced solos, Beat_Lab is your
              all-in-one space to learn, practice, and grow as a drummer.
            </p>
            <a
              href="#levels"
              className="bg-[#2a6496] text-white px-6 py-3 rounded-md hover:bg-[#1a4a70] transition"
            >
              Start Learning Now
            </a>
          </div>
        </div>
      </section>

      <section id="levels" className="bg-[#f4f4f4] py-20 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Choose Your Path
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              level: "Beginner",
              desc: "Learn the basics — from holding sticks to your first beats.",
            },
            {
              level: "Intermediate",
              desc: "Explore new grooves, rudiments, and expand your creativity.",
            },
            {
              level: "Advanced",
              desc: "Take your drumming to the next level with complex rhythms and soloing techniques.",
            },
          ].map(({ level, desc }) => (
            <div
              key={level}
              className="bg-white rounded-xl shadow hover:shadow-md p-6 transition"
            >
              <h3 className="text-xl font-semibold text-[#2a6496] mb-2">
                {level}
              </h3>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white py-20 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How Beat_Lab Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          <div>
            <div className="text-4xl mb-3">📼</div>
            <h4 className="text-xl font-semibold mb-2 text-[#2a6496]">
              Watch Lessons
            </h4>
            <p className="text-gray-600">
              Step-by-step videos taught by real drummers.
            </p>
          </div>
          <div>
            <div className="text-4xl mb-3">🥁</div>
            <h4 className="text-xl font-semibold mb-2 text-[#2a6496]">
              Practice Daily
            </h4>
            <p className="text-gray-600">
              Get clear exercises to build technique.
            </p>
          </div>
          <div>
            <div className="text-4xl mb-3">🚀</div>
            <h4 className="text-xl font-semibold mb-2 text-[#2a6496]">
              Track Progress
            </h4>
            <p className="text-gray-600">
              Stay motivated as you unlock each new level.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#f4f4f4] py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Beat_Lab?</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          Because learning drums shouldn't be confusing or boring. At Beat_Lab,
          we break down every concept clearly, one rhythm at a time. Whether
          you're learning at home or on the go, we help you stay consistent,
          motivated, and inspired.
        </p>
      </section>
      <section className="bg-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-[#2a6496] mb-4">
          Ready to Play?
        </h2>
        <p className="text-gray-700 mb-6">
          Join the Beat_Lab community and start learning today. Your drum
          journey starts right here.
        </p>
        <a
          href="/signup"
          className="bg-[#2a6496] text-white px-6 py-3 rounded-md hover:bg-[#1a4a70] transition"
        >
          Get Started for Free
        </a>
      </section>
    </div>
  );
}
