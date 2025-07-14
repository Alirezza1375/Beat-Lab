import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ConfirmDialog from "../Dialog/ConfirmDialog";

export default function EditBeatMachine({
  beat,
  editable = true,
  small = false,
}) {
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

  const [beats, setBeats] = useState(beat ? beat.beat_schema : initialState);
  const playingRef = useRef(false);
  const handleStopBeat = () => {
    playingRef.current = false;
  };
  const beatsRef = useRef(beats);
  const [beatName, setBeatName] = useState(beat ? beat.beat_name : "");
  const [genre, setGenre] = useState(beat ? beat.genre : "Rock");
  const [bpm, setBpm] = useState(beat ? beat.bpm : 120);

  useEffect(() => {
    beatsRef.current = beats;
  }, [beats]);

  const toggleBeat = (instrument, row, col) => {
    setBeats((prevBeats) => {
      const newBeats = { ...prevBeats };
      newBeats[instrument] = newBeats[instrument].map((r, i) =>
        i === row ? r.map((c, j) => (j === col ? (c === 0 ? 1 : 0) : c)) : r
      );

      return { ...newBeats };
    });
  };

  // handle edit beat
  async function handleUpdateBeat(beatId) {
    const confirm = window.confirm("Are you sure you want to edit this beat?");
    if (!confirm) return;
    const updatedBeat = {
      beat_name: beatName,
      genre: genre,
      beat_schema: beats,
      bpm: bpm,
      user_id: 1,
    };

    const res = await fetch(`http://127.0.0.1:5000/beats/${beatId}`, {
      method: "PUT",
      body: JSON.stringify(updatedBeat),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      alert("Beat updated successfully!");
    } else {
      alert("Faild to updated beat! try again...");
    }
  }

  async function getSingleBeat(id) {
    const res = await fetch(`http://127.0.0.1:5000/beats/${id}`);
    const data = await res.json();
    setBeatName(data.beat_name);
    setBeats((prevSchema) => {
      prevSchema.kick = data.beat_schema.kick;
      prevSchema.snare = data.beat_schema.snare;
      prevSchema["high-hat"] = data.beat_schema["high-hat"];
      prevSchema.tom1 = data.beat_schema.tom1;
      prevSchema.tom2 = data.beat_schema.tom2;
      return prevSchema;
    });
    setBpm(data.bpm);
    setGenre(data.genre);
  }

  const params = useParams();

  useEffect(() => {
    beat ? () => {} : getSingleBeat(params.id);
  }, []);

  // new: Audio-data preparing
  const audioFiles = {
    kick: new Audio("/sounds/kick.wav"),
    snare: new Audio("/sounds/snare.wav"),
    "high-hat": new Audio("/sounds/CH.wav"),
  };

  async function playInstrument(instrument, interval) {
    const sound = audioFiles[instrument];
    const measures = beatsRef.current[instrument];
    const allCells = document.getElementsByClassName("cell");

    while (playingRef.current) {
      for (let i = 0; i < measures.length; i++) {
        const measure = measures[i];

        for (let j = 0; j < measure.length; j++) {
          if (!playingRef.current) return;

          const noteNumber = i * 4 + j;

          // Clear previous highlights
          for (let cell of allCells) {
            cell.classList.remove("border-white");
          }

          // Highlight current note
          const highlightedCells = document.getElementsByClassName(
            `cell-${noteNumber}`
          );
          for (let cell of highlightedCells) {
            cell.classList.add("border-white");
          }

          // Play sound if note is active
          if (measure[j]) {
            sound.currentTime = 0;
            sound.play();
          }

          // Wait for the interval
          await new Promise((resolve) => setTimeout(resolve, interval));
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
        {editable ? (
          <input
            placeholder="Beat Name"
            className="text-white placeholder-white"
            value={beatName}
            onChange={(e) => setBeatName(e.target.value)}
          />
        ) : (
          <p>{beatName}</p>
        )}
        {editable ? (
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="text-white"
          >
            <option value="rock">Rock</option>
            <option value="pop">pop</option>
          </select>
        ) : (
          <p>{genre}</p>
        )}
        {editable ? (
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
        ) : (
          <p>{bpm}</p>
        )}
        {/* <button className="h-10 w-20 bg-blue-400" onClick={handleBpmbutton}>
          set
        </button> */}
      </div>
      {Object.keys(beats).map((instrument) => (
        <div key={instrument} className={small ? "" : "space - y - 2"}>
          <h2 className="text-xl text-gray-300 font-bold capitalize">
            {instrument}
          </h2>
          <div className={`flex ${small ? "gap-6" : "gap-8"}`}>
            {beats[instrument].map((row, rowIndex) => {
              return (
                <div key={rowIndex} className="flex gap-2">
                  {row.map((beat, colIndex) => (
                    <button
                      key={`${instrument}-${rowIndex}-${colIndex}`}
                      className={` border-2 rounded-lg bg ${
                        beat == 1 ? "bg-blue-500" : "bg-red-300"
                      } ${small ? "w-6 h-6" : "w-12 h-12"}`}
                      onClick={
                        editable
                          ? () => toggleBeat(instrument, rowIndex, colIndex)
                          : () => {}
                      }
                    ></button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="flex flex-row justify-center gap-6">
        {editable ? (
          <button
            className="text-white cursor-pointer hover:font-bold"
            onClick={() => handleUpdateBeat(params.id)}
          >
            Edit beat
          </button>
        ) : null}
        {/* new: Play Button */}
        <button
          className="text-white cursor-pointer hover:font-bold"
          onClick={playBeat}
        >
          Play beat
        </button>
        <button
          className=" text-white cursor-pointer hover:font-bold"
          onClick={handleStopBeat}
        >
          Stop
        </button>
      </div>
    </div>
  );
}
