import React from "react";

export default function HowItWorksSection() {
  return (
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
  );
}
