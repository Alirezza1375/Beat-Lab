import React from "react";

export default function ReadyToPlaySection() {
  return (
    <section className="bg-white py-16 px-4 text-center">
      <h2 className="text-3xl font-bold text-[#2a6496] mb-4">Ready to Play?</h2>
      <p className="text-gray-700 mb-6">
        Join the Beat Lab community and start learning today. Your drum journey
        starts right here.
      </p>
      <a
        href="/courses"
        className="bg-[#2a6496] text-white px-6 py-3 rounded-md hover:bg-[#1a4a70] transition"
      >
        Get Started for Free
      </a>
    </section>
  );
}
