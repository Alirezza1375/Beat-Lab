import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [texts, setTexts] = useState([]);
  const [beats, setBeats] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState("");
  const [selectedBeatId, setSelectedBeatId] = useState("");
  const navigate = useNavigate();
  const { user, token } = useAuthContext();
  useEffect(() => {
    async function fetchData() {
      try {
        const textsRes = await fetch(
          "https://beatlab-backend.onrender.com/texts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const beatsRes = await fetch(
          "https://beatlab-backend.onrender.com/beats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const textsData = await textsRes.json();
        const beatsData = await beatsRes.json();
        setTexts(textsData);
        setBeats(beatsData);
      } catch (err) {
        console.error("Error fetching texts or beats:", err);
      }
    }

    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const pageRes = await fetch(
        "https://beatlab-backend.onrender.com/pages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, user_id: user.id }),
        }
      );

      const newPageRes = await pageRes.json();
      const newPage = newPageRes.page;

      // Create text block
      await fetch("https://beatlab-backend.onrender.com/page_blocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          block_type: "text",
          page_id: newPage.id,
          block_id: selectedTextId,
          position: 1,
        }),
      });

      // Create beat block
      await fetch("https://beatlab-backend.onrender.com/page_blocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          block_type: "beat",
          page_id: newPage.id,
          block_id: selectedBeatId,
          position: 2,
        }),
      });

      navigate(`/page/edit/${newPage.id}`);
    } catch (err) {
      console.error("Error creating page or page blocks:", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold">Page Title</label>
        <input
          type="text"
          className="border rounded-full px-2 py-1 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Select Text</label>
        <select
          value={selectedTextId}
          onChange={(e) => setSelectedTextId(e.target.value)}
          required
          className="border rounded-full px-2 py-1 w-full"
        >
          <option value="">-- Choose a text --</option>
          {texts.map((text) => (
            <option key={text.id} value={text.id}>
              {text.content.slice(0, 25)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold">Select Beat</label>
        <select
          value={selectedBeatId}
          onChange={(e) => setSelectedBeatId(e.target.value)}
          required
          className="border rounded-full px-2 py-1 w-full"
        >
          <option value="">-- Choose a beat --</option>
          {beats.map((beat) => (
            <option key={beat.id} value={beat.id}>
              {beat.beat_name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-[#2a6496] text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        Create Page
      </button>
    </form>
  );
}
