import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertDialog from "../Dialog/AlertDialog";
import { useAuthContext } from "../../context/AuthContextProvider";

export default function BeatMachine() {
  console.log("re-render");
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
  const beatsRef = useRef(beats);
  const [beatName, setBeatName] = useState("");
  const [genre, setGenre] = useState("rock");
  const [bpm, setBpm] = useState(120);
  const [alertDialog, setAlertDialog] = useState({
    openDialog: false,
    response: "",
  });

  const { user, token } = useAuthContext();

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

  const handleCloseDialog = () => {
    setAlertDialog((prev) => ({ ...prev, openDialog: false, response: "" }));
  };

  async function handleSubmitBeat() {
    const beatToSend = {
      beat_name: beatName,
      genre: genre,
      beat_schema: beats,
      bpm: bpm,
      user_id: user.id,
    };

    console.log("submitting beat JSON:", beatToSend);

    const res = await fetch("https://beatlab-backend.onrender.com/beats", {
      method: "POST",
      body: JSON.stringify(beatToSend),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      setAlertDialog((prev) => ({ ...prev, openDialog: true, response: "ok" }));
      setBeats(initialState);
      console.log("beat created successfuly!");
    } else {
      setAlertDialog((prev) => ({
        ...prev,
        openDialog: true,
        response: "error",
      }));
    }
  }

  // audio-data preparing
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
        console.log(instrument);
        playInstrument(instrument, interval);
      }
    }
  };

  return (
    <div className="bg-white border border-gray-300 p-4 space-y-4 w-[1000px]">
      <div className="flex flex-row justify-around">
        <input
          placeholder="Beat Name"
          className="bg-white text-black border border-gray-300 rounded px-2 placeholder-gray-500"
          value={beatName}
          onChange={(e) => setBeatName(e.target.value)}
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="bg-white text-black border border-gray-300 rounded px-2"
        >
          <option value="rock">Rock</option>
          <option value="pop">Pop</option>
          <option value="funck">Funck</option>
          <option value="hipHop">Hip-Hop</option>
        </select>
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
      </div>
      {Object.keys(beats).map((instrument) => (
        <div key={instrument} className="space-y-2 w-full overflow-scroll">
          <h2 className="text-xl text-[#2a6496] font-bold capitalize">
            {instrument}
          </h2>
          <div className="flex gap-8 w-full">
            {beats[instrument].map((row, rowIndex) => {
              return (
                <div key={rowIndex} className="flex gap-2">
                  {row.map((beat, colIndex) => (
                    <button
                      key={`${instrument}-${rowIndex}-${colIndex}`}
                      className={`cell-${
                        rowIndex * 4 + colIndex
                      } cell w-12 h-12 border-2 rounded-lg ${
                        beat == 1 ? "bg-[#2a6496] text-white" : "bg-gray-200"
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
        <button
          className="text-[#2a6496] font-semibold cursor-pointer hover:underline"
          onClick={handleSubmitBeat}
        >
          Create beat
        </button>
        <button
          className="text-[#2a6496] font-semibold cursor-pointer hover:underline"
          onClick={playBeat}
        >
          Play beat
        </button>
        <button
          className="text-[#2a6496] font-semibold cursor-pointer hover:underline"
          onClick={handleStopBeat}
        >
          Stop
        </button>
        <Link
          className="text-[#2a6496] font-semibold hover:underline cursor-pointer"
          to={"/beats"}
        >
          All Beats
        </Link>
      </div>
      <AlertDialog
        open={alertDialog.openDialog}
        handleClose={handleCloseDialog}
      >
        {alertDialog.response === "ok"
          ? "Beat created successfully"
          : "faild to create the beat!"}
      </AlertDialog>
    </div>
  );
}
