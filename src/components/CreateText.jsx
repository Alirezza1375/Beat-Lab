import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateText() {
  const [text, setText] = useState("");

  async function handleSubmitText() {
    const textToSend = {
      content: text,
    };

    console.log("submitting text JSON:", textToSend);

    const res = await fetch("http://127.0.0.1:5000/texts", {
      method: "POST",
      body: JSON.stringify(textToSend),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      setText("");
      alert("Text submitted successfully");
    } else {
    }
  }

  return (
    <div className="flex flex-col">
      <textarea
        className="bg-white border border-black-400 w-96 block"
        placeholder="Text Content"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="block cursor-pointer hover:font-bold"
        onClick={handleSubmitText}
      >
        Create text
      </button>
    </div>
  );
}
