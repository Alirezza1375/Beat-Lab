import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";

export default function CreateText() {
  const [text, setText] = useState("");
  const { user, token } = useAuthContext();

  async function handleSubmitText() {
    const textToSend = {
      content: text,
      user_id: user.id,
    };

    console.log("submitting text JSON:", textToSend);

    const res = await fetch("https://beatlab-backend.onrender.com/texts", {
      method: "POST",
      body: JSON.stringify(textToSend),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        className="cursor-pointer hover:font-bold bg-[#2a6496] text-white px-4 py-2 rounded hover:bg-blue-700 w-[127px] h-[40px] mt-1"
        onClick={handleSubmitText}
      >
        Create text
      </button>
    </div>
  );
}
