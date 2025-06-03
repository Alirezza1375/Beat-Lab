import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Beats({ allData }) {
  const [allBeats, setAllBeats] = useState([]);

  async function getBeats() {
    try {
      const res = await fetch("http://127.0.0.1:5000/beats");
      const data = await res.json();
      setAllBeats([...data]);
      console.log(data, "data");
    } catch (err) {
      console.error("Faild to fetch the data!", err);
    }
  }

  useEffect(() => {
    getBeats();
  }, []);

  return (
    <div>
      <div>
        {allBeats.map((item, index) => (
          <Link key={item.id} to={`/beat/edit/${item.id}`}>
            <div>
              <h1 className="cursor-pointer">{item.beat_name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
