import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ConfirmDialog from "../Dialog/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";

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
  const { user, token } = useAuthContext();
  const navigate = useNavigate();

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

    const res = await fetch(
      `https://beatlab-backend.onrender.com/beats/${beatId}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedBeat),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      alert("Beat updated successfully!");
      navigate("/admin-dashboard");
    } else {
      alert("Faild to updated beat! try again...");
    }
  }

  async function getSingleBeat(id) {
    const res = await fetch(
      `https://beatlab-backend.onrender.com/beats/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    <div className="flex justify-center w-full">
      <div className="bg-white border border-gray-300 p-4 space-y-4">
        <div className="flex flex-row justify-around">
          {editable ? (
            <input
              placeholder="Beat Name"
              className="bg-white text-black border border-gray-300 rounded px-2"
              value={beatName}
              onChange={(e) => setBeatName(e.target.value)}
            />
          ) : (
            <p className="text-black">{beatName}</p>
          )}
          {editable ? (
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="bg-white text-black border border-gray-300 rounded px-2"
            >
              <option value="rock">Rock</option>
              <option value="pop">Pop</option>
              <option value="funck">Funk</option>
              <option value="hipHop">Hip-Hop</option>
            </select>
          ) : (
            <p className="text-black">{genre}</p>
          )}
          {editable ? (
            <input
              type="number"
              max={240}
              min={40}
              name="bpmSelector"
              placeholder="select bpm..."
              className="bg-white text-black border border-gray-300 rounded px-2"
              value={bpm}
              onChange={handleBpmChange}
            />
          ) : (
            <p className="text-black">{bpm}</p>
          )}
        </div>
        {Object.keys(beats).map((instrument) => (
          <div key={instrument} className="space-y-2 w-full overflow-x-auto">
            <h2 className="text-xl text-[#2a6496] font-bold capitalize">
              {instrument}
            </h2>
            <div className="flex gap-8 w-fit">
              {beats[instrument].map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                  {row.map((beat, colIndex) => (
                    <button
                      key={`${instrument}-${rowIndex}-${colIndex}`}
                      className={`border-2 rounded-lg ${
                        beat == 1 ? "bg-[#2a6496] text-white" : "bg-gray-200"
                      } ${small ? "w-6 h-6" : "w-12 h-12"}`}
                      onClick={
                        editable
                          ? () => toggleBeat(instrument, rowIndex, colIndex)
                          : () => {}
                      }
                    ></button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-row justify-center gap-6">
          {editable ? (
            <button
              className="text-[#2a6496] cursor-pointer hover:font-bold"
              onClick={() => handleUpdateBeat(params.id)}
            >
              Edit beat
            </button>
          ) : null}
          <button
            className="text-[#2a6496] cursor-pointer hover:font-bold"
            onClick={playBeat}
          >
            Play beat
          </button>
          <button
            className="text-[#2a6496] cursor-pointer hover:font-bold"
            onClick={handleStopBeat}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}
