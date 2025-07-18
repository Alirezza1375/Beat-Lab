import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BeatMachineViewer({ beat }) {
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
  const [bpm, setBpm] = useState(beat ? beat.bpm : 120);
  const [hitState, setHitState] = useState({
    kick: false,
    snare: false,
    "high-hat": false,
  });

    const [beatName, setBeatName] = useState(beat ? beat.beat_name : "");
    const [genre, setGenre] = useState(beat ? beat.genre : "Rock");

  const playingRef = useRef(false);
  const beatsRef = useRef(beats);
  const audioFiles = {
    kick: new Audio("/sounds/kick.wav"),
    snare: new Audio("/sounds/snare.wav"),
    "high-hat": new Audio("/sounds/CH.wav"),
  };

  useEffect(() => {
    beatsRef.current = beats;
  }, [beats]);

  const handleStopBeat = () => {
    playingRef.current = false;
  };

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

  async function playInstrument(instrument, interval) {
    const sound = audioFiles[instrument];
    const measures = beatsRef.current[instrument];

    while (playingRef.current) {
      for (let i = 0; i < measures.length; i++) {
        for (let j = 0; j < measures[i].length; j++) {
          if (!playingRef.current) return;
          const shouldPlay = measures[i][j] === 1;

          if (shouldPlay) {
            setHitState((prev) => ({ ...prev, [instrument]: true }));
            sound.currentTime = 0;
            sound.play();
          }

          await new Promise((res) => setTimeout(res, interval));
          setHitState((prev) => ({ ...prev, [instrument]: false }));
        }
      }
    }
  }

  const playBeat = async () => {
    if (!playingRef.current) {
      const steps = 4;
      const interval = (60 * 1000) / bpm / steps;
      playingRef.current = true;
      for (const instrument of Object.keys(beats)) {
        playInstrument(instrument, interval);
      }
    }
  };

  return (
    <div className="bg-[#242424] border border-red-500 p-4 space-y-6">
      <h1 className="text-white text-2xl text-center font-bold">{beat?.beat_name || "Beat Viewer"}</h1>
      <div className="flex flex-row justify-center gap-10">
        {Object.keys(hitState).map((instrument) => (
          <div key={instrument} className="flex flex-col items-center">
            <img
              src={`/images/${instrument}${hitState[instrument] ? "-hit" : ""}.png`}
              alt={instrument}
              className="w-24 h-24 transition duration-100"
            />
            <p className="text-white capitalize mt-2">{instrument}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center gap-6 mt-6">
        <button
          className="text-white border px-4 py-2 rounded hover:bg-white hover:text-black"
          onClick={playBeat}
        >
          ▶ Play Beat
        </button>
        <button
          className="text-white border px-4 py-2 rounded hover:bg-white hover:text-black"
          onClick={handleStopBeat}
        >
          ⏹ Stop
        </button>
      </div>
    </div>
  );
}
