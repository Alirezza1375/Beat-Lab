import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Texts() {
  const [allTexts, setAllTexts] = useState([]);

  async function getTexts() {
    try {
      const res = await fetch("http://127.0.0.1:5000/texts");
      const data = await res.json();
      setAllTexts([...data]);
    } catch (err) {
      console.error("Failed to fetch the data!", err);
    }
  }

  async function deleteText(id) {
    const confirm = window.confirm(
      "Are you sure you want to delete this text ?"
    );
    if (!confirm) return;
    try {
      const res = await fetch(`http://127.0.0.1:5000/texts/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setAllTexts((prev) => prev.filter((text) => text.id !== id));
        console.log("Text deleted successfully!");
      } else {
        console.error("Faild to delete the text");
      }
    } catch (err) {
      console.error("Error deleting text!", err);
    }
  }

  useEffect(() => {
    getTexts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2a6496] mb-10">Your Texts</h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allTexts.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <button
                title="Delete"
                className="absolute top-3 right-3.5 text-red-500 cursor-pointer rounded hover:text-red-700 text-lg font-bold"
                onClick={() => deleteText(item.id)}
              >
                ×
              </button>

              <Link to={`/text/edit/${item.id}`} className="block mt-1.5">
                <h2 className="text-xl font-semibold text-[#2a6496] mb-2">
                  {item.content}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
