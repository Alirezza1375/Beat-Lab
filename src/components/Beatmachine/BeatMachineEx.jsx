import React, { useState } from "react";

export default function BeatMachine() {
  const initialState = {
    kick: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    snare: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    "high-hat": [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    tom1: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    tom2: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  };
  const [beats, setBeats] = useState(initialState);

  const toggleBeat = (instrument, row, col) => {
    setBeats((prevBeats) => {
      const newBeats = { ...prevBeats };
      newBeats[instrument] = newBeats[instrument].map((r, i) =>
        i === row ? r.map((c, j) => (j === col ? (c === 0 ? 1 : 0) : c)) : r
      );
      return { ...newBeats };
    });
  };

  async function handleSubmitBeat() {
    const beatToSend = {
      beat_name: "React Beat",
      genre: "Rock",
      beat_schema: beats,
      user_id: 1,
    };

    const res = await fetch("http://127.0.0.1:5000/beats", {
      method: "POST",
      body: JSON.stringify(beatToSend),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.ok);
  }

  // ⬇️ NEU: Audio-Dateien vorbereiten
  const audioFiles = {
    kick: new Audio("/sounds/kick.wav"),
    snare: new Audio("/sounds/snare.wav"),
    "high-hat": new Audio("/sounds/hihat.wav"),
    tom1: new Audio("/sounds/tom1.wav"),
    tom2: new Audio("/sounds/tom2.wav"),
  };

  // ⬇️ NEU: Play-Funktion
  const playBeat = async () => {
    const steps = 4;
    const interval = 400;

    for (let step = 0; step < steps; step++) {
      for (const instrument in beats) {
        for (let row = 0; row < beats[instrument].length; row++) {
          if (beats[instrument][row][step] === 1) {
            const sound = audioFiles[instrument];
            if (sound) {
              sound.currentTime = 0;
              sound.play();
            }
          }
        }
      }
      await new Promise((res) => setTimeout(res, interval));
    }
  };

  return (
    <div className=" border border-red-500 p-4 space-y-4">
      <input placeholder="Beat Name" />
      <select>
        <option value="rock">Rock</option>
        <option value="pop">pop</option>
      </select>
      {Object.keys(beats).map((instrument) => (
        <div key={instrument} className="space-y-2">
          <h2 className="text-xl font-bold capitalize">{instrument}</h2>
          <div className="flex gap-8">
            {beats[instrument].map((row, rowIndex) => {
              return (
                <div key={rowIndex} className="flex gap-2">
                  {row.map((beat, colIndex) => (
                    <button
                      key={`${instrument}-${rowIndex}-${colIndex}`}
                      className={`w-12 h-12 border-2 rounded-lg bg ${
                        beat == 1 ? "bg-blue-500" : "bg-red-300"
                      }`}
                      onClick={() => toggleBeat(instrument, rowIndex, colIndex)}
                    ></button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <button onClick={handleSubmitBeat}>Create beat</button>
      {/* ⬇️ NEU: Play Button */}
      <button onClick={playBeat}>Play beat</button>
    </div>
  );
}
