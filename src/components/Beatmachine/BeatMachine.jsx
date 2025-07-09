import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Beats from "../Pages/Beats";
import AlertDialog from "../Dialog/AlertDialog";

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
      user_id: 1,
    };

    console.log("submitting beat JSON:", beatToSend);

    const res = await fetch("http://127.0.0.1:5000/beats", {
      method: "POST",
      body: JSON.stringify(beatToSend),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      setAlertDialog((prev) => ({ ...prev, openDialog: true, response: "ok" }));
      setBeats(initialState);
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
    kick: new Audio("sounds/kick.wav"),
    snare: new Audio("sounds/snare.wav"),
    "high-hat": new Audio("sounds/CH.wav"),
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
    <div className="bg-[#242424] border border-red-500 p-4 space-y-4 w-[1000px]">
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
          className="placeholder-white text-white"
          value={bpm}
          onChange={handleBpmChange}
        />
        {/* <button className="h-10 w-20 bg-blue-400" onClick={handleBpmbutton}>
          set
        </button> */}
      </div>
      {Object.keys(beats).map((instrument) => (
        <div key={instrument} className="space-y-2 w-full overflow-scroll">
          <h2 className="text-xl text-gray-300 font-bold capitalize">
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
                      } cell w-12 h-12 border-2 rounded-lg bg ${
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
        <button
          className="text-white cursor-pointer hover:font-bold"
          onClick={handleSubmitBeat}
        >
          Create beat
        </button>
        {/* new: Play Button */}
        <button
          className="text-white cursor-pointer hover:font-bold"
          onClick={playBeat}
        >
          Play beat
        </button>
        <button
          className="text-white cursor-pointer hover:font-bold"
          onClick={handleStopBeat}
        >
          Stop
        </button>
        <Link
          className="text-white hover:font-bold cursor-pointer"
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
