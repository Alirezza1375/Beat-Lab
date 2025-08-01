import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditBeatMachine from "../Beatmachine/EditBeatMachine";
import { useAuthContext } from "../../context/AuthContextProvider";

export default function PageEdit() {
  const [page, setPage] = useState("");
  const [pageBlocks, setPageBlocks] = useState([]);
  const { token } = useAuthContext();

  const params = useParams();

  // create a function to get the page info
  async function getPageInfo() {
    try {
      const res = await fetch(
        `https://beatlab-backend.onrender.com/pages/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setPage(data);
      return data;
    } catch (err) {
      console.error("Failed to fetch the data!", err);
    }
  }

  // create a function getText(id)
  async function getText(id) {
    const res = await fetch(
      `https://beatlab-backend.onrender.com/texts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch text block");
    return await res.json();
  }

  // create a function getBeat(id)
  async function getBeat(id) {
    const res = await fetch(
      `https://beatlab-backend.onrender.com/beats/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch beat block");
    return await res.json();
  }

  async function getBlock(block) {
    let content;
    if (block.block_type === "text") {
      content = await getText(block.block_id);
    } else {
      content = await getBeat(block.block_id);
    }

    // Save block info with position and type
    const blockWithMeta = {
      ...content,
      block_type: block.block_type,
      position: block.position,
    };

    setPageBlocks((prev) => [...prev, blockWithMeta]);
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

  // Sort blocks by position before rendering
  const sortedBlocks = [...pageBlocks].sort((a, b) => a.position - b.position);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {page && (
          <h1 className="text-3xl font-bold text-[#2a6496] mb-10">
            {page.title}
          </h1>
        )}

        {sortedBlocks.map((block, idx) =>
          block.block_type === "text" ? (
            <p key={idx} className="text-lg mb-6">
              {block.content}
            </p>
          ) : (
            <div key={idx} className="mb-8">
              <EditBeatMachine beat={block} editable={false} small={true} />
            </div>
          )
        )}
      </div>
    </div>
  );
}
