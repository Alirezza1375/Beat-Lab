import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PageEdit() {
  const [page, setPage] = useState("");
  const [pageBlocks, setPageBlocks] = useState([]);

  const params = useParams();

  // create a function to get the page info
  async function getPageInfo() {
    try {
      const res = await fetch(`http://127.0.0.1:5000/pages/${params.id}`);
      const data = await res.json();
      setPage(data);
      return data;
    } catch (err) {
      console.error("Failed to fetch the data!", err);
    }
  }

  // create a function getText(id)
  async function getText(id) {
    const res = await fetch(`http://127.0.0.1:5000/texts/${id}`);
    if (!res.ok) throw new Error("Failed to fetch text block");
    return await res.json();
  }

  // create a function getBeat(id)
  async function getBeat(id) {
    const res = await fetch(`http://127.0.0.1:5000/beats/${id}`);
    if (!res.ok) throw new Error("Failed to fetch beat block");
    return await res.json();
  }

  async function getBlock(block) {
    if (block.block_type === "text") {
      const textData = await getText(block.block_id);
      return setPageBlocks((prevBlocks) => [...prevBlocks, textData]);
    } else {
      const beatData = await getBeat(block.block_id);
      return setPageBlocks((prevBlocks) => [...prevBlocks, beatData]);
    }
  }

  // create a function to add obj to pageBlocks state
  // if block_type === text -> getText(id)
  // if block_type === beat -> getBeat(id)

  useEffect(() => {
    getPageInfo().then((data) => {
      for (let block of data.blocks) {
        getBlock(block);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {page && (
          <h1 className="text-3xl font-bold text-[#2a6496] mb-10">
            {page.title}
          </h1>
        )}
      </div>
    </div>
  );
}
