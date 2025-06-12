import React from "react";

export default function Footer() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-around items-center space-y-3 sm:space-y-0">
      <p>
        &copy; 2025 <span className="text-white font-semibold">Beat_Lab</span>.
        All rights reserved.
      </p>
      <div className="flex space-x-5">
        <a href="#" className="hover:text-white transition-colors">
          Privacy
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Terms
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Contact
        </a>
      </div>
    </div>
  );
}
