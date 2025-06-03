import React from "react";

export default function LevelsSection() {
  return (
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
  );
}
