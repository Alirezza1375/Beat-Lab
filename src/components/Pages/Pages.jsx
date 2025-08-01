import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";

export default function Pages() {
  const [allPages, setAllPages] = useState([]);
  const { user, token } = useAuthContext();

  async function getPages() {
    try {
      const res = await fetch("https://beatlab-backend.onrender.com/pages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAllPages([...data]);
    } catch (err) {
      console.error("Failed to fetch the data!", err);
    }
  }

  async function deletePage(id) {
    const confirm = window.confirm(
      "Are you sure you want to delete this page ?"
    );
    if (!confirm) return;
    try {
      const res = await fetch(
        `https://beatlab-backend.onrender.com/pages/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setAllPages((prev) => prev.filter((page) => page.id !== id));
        console.log("Page deleted successfully!");
      } else {
        console.error("Faild to delete the page");
      }
    } catch (err) {
      console.error("Error deleting page!", err);
    }
  }

  useEffect(() => {
    getPages();
  }, []);

  console.log(allPages);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2a6496] mb-10">Your Pages</h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allPages.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <button
                title="Delete"
                className="absolute top-3 right-3.5 text-red-500 cursor-pointer rounded hover:text-red-700 text-lg font-bold"
                onClick={() => deletePage(item.id)}
              >
                ×
              </button>

              <Link to={`/page/edit/${item.id}`} className="block mt-1.5">
                <h2 className="text-xl font-semibold text-[#2a6496] mb-2">
                  {item.title}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
