import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Beats() {
  const [allBeats, setAllBeats] = useState([]);

  async function getBeats() {
    try {
      const res = await fetch("http://127.0.0.1:5000/beats");
      const data = await res.json();
      setAllBeats([...data]);
    } catch (err) {
      console.error("Failed to fetch the data!", err);
    }
  }

  async function deleteBeat(id) {
    const confirm = window.confirm(
      "Are you sure you want to delete this beat ?"
    );
    if (!confirm) return;
    try {
      const res = await fetch(`http://127.0.0.1:5000/beats/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setAllBeats((prev) => prev.filter((beat) => beat.id !== id));
        console.log("Beat deleted successfully!");
      } else {
        console.error("Faild to delete the beat");
      }
    } catch (err) {
      console.error("Error deleting beat!", err);
    }
  }

  useEffect(() => {
    getBeats();
  }, []);

  console.log(allBeats);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2a6496] mb-10">Your Beats</h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allBeats.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <button
                title="Delete"
                className="absolute top-3 right-3.5 text-red-500 cursor-pointer rounded hover:text-red-700 text-lg font-bold"
                onClick={() => deleteBeat(item.id)}
              >
                ×
              </button>

              <Link to={`/beat/edit/${item.id}`} className="block mt-1.5">
                <h2 className="text-xl font-semibold text-[#2a6496] mb-2">
                  {item.beat_name}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium text-gray-800">BPM:</span>{" "}
                  {item.bpm || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Genre:</span>{" "}
                  {item.genre || "Unknown"}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
