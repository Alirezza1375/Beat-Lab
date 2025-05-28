import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";

export default function EditBeatMachine() {
  console.log(useParams());
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
  const playingRef = useRef(false);
  const handleStopBeat = () => {
    playingRef.current = false;
  };
  const [beatName, setBeatName] = useState("");
  const [genre, setGenre] = useState("rock");
  const [bpm, setBpm] = useState(120);

  const toggleBeat = (instrument, row, col) => {
    setBeats((prevBeats) => {
      const newBeats = { ...prevBeats };
      newBeats[instrument] = newBeats[instrument].map((r, i) =>
        i === row ? r.map((c, j) => (j === col ? (c === 0 ? 1 : 0) : c)) : r
      );

      return { ...newBeats };
    });
  };

  // also save the bpm
  async function handleSubmitBeat() {
    const beatToSend = {
      beat_name: beatName,
      genre: genre,
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
    if (res.ok) {
      alert("Beat created successfully");
    }
  }

  // new: Audio-data preparing
  const audioFiles = {
    kick: new Audio("sounds/kick.wav"),
    snare: new Audio("sounds/snare.wav"),
    "high-hat": new Audio("/sounds/zoom.wav"),
    tom1: new Audio("/sounds/tom1.wav"),
    tom2: new Audio("/sounds/tom2.wav"),
  };

  async function playInstrument(instrument, interval) {
    while (playingRef.current) {
      for (let measure of beats[instrument]) {
        const sound = audioFiles[instrument];
        for (let note of measure) {
          if (!playingRef.current) return;
          if (note) {
            sound.currentTime = 0;
            sound.play();
          }
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve();
            }, interval)
          );
        }
      }
    }
  }

  const handleBpmChange = (e) => {
    setBpm(e.target.value);
  };

  const playBeat = async () => {
    if (!playingRef.current) {
      const bpmValue = bpm;
      const steps = 4;
      const interval = (60 * 1000) / bpmValue / steps;
      playingRef.current = true;
      for (const instrument in beats) {
        playInstrument(instrument, interval);
      }
    }
  };

  return (
    <div className="bg-[#242424] border border-red-500 p-4 space-y-4">
      <div className="flex flex-row justify-around">
        <input
          placeholder="Beat Name"
          className="text-white placeholder-white"
          value={beatName}
          onChange={(e) => setBeatName(e.target.value)}
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="text-white"
        >
          <option value="rock">Rock</option>
          <option value="pop">pop</option>
        </select>
        <input
          type="number"
          max={240}
          min={40}
          name="bpmSelector"
          placeholder="select bpm..."
          className="placeholder-white text-white"
          value={bpm}
          onChange={handleBpmChange}
        />
        {/* <button className="h-10 w-20 bg-blue-400" onClick={handleBpmbutton}>
          set
        </button> */}
      </div>
      {Object.keys(beats).map((instrument) => (
        <div key={instrument} className="space-y-2">
          <h2 className="text-xl text-gray-300 font-bold capitalize">
            {instrument}
          </h2>
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
      <div className="flex flex-row justify-center gap-6">
        <button className="text-white" onClick={handleSubmitBeat}>
          Create beat
        </button>
        {/* new: Play Button */}
        <button className="text-white cursor-pointer" onClick={playBeat}>
          Play beat
        </button>
        <button
          className="bg-red-400 text-white cursor-pointer"
          onClick={handleStopBeat}
        >
          Stop
        </button>
      </div>
    </div>
  );
}
