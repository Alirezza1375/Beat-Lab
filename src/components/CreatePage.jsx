import React, { useEffect, useState } from "react";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [texts, setTexts] = useState([]);
  const [beats, setBeats] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState("");
  const [selectedBeatId, setSelectedBeatId] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const textsRes = await fetch("http://127.0.0.1:5000/texts");
        const beatsRes = await fetch("http://127.0.0.1:5000/beats");
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
      // Create the page
      const pageRes = await fetch("http://127.0.0.1:5000/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ title }),
      });

      const newPageRes = await pageRes.json();
      const newPage = newPageRes.page;

      // Create text block (position 1)
      await fetch("http://127.0.0.1:5000/page_blocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        "Access-Control-Allow-Origin": "*",
        body: JSON.stringify({
          block_type: "text",
          page_id: newPage.id,
          id: selectedTextId,
          position: 1,
        }),
      });

      // Create beat block (position 2)
      await fetch("http://localhost:5000/page_blocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        "Access-Control-Allow-Origin": "*",
        body: JSON.stringify({
          block_type: "beat",
          page_id: newPage.id,
          id: selectedBeatId,
          position: 2,
        }),
      });

      alert("Page and page blocks created successfully!");
      setTitle("");
      setSelectedTextId("");
      setSelectedBeatId("");
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
          className="border px-2 py-1 w-full"
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
          className="border px-2 py-1 w-full"
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
          className="border px-2 py-1 w-full"
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
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Page
      </button>
    </form>
  );
}
