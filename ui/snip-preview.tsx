"use client";

import { Snip } from "@/lib/database";
import React, { useState, useEffect, cache } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

type SnipPreviewProps = {
  snippet: Snip;
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function SnipPreview({ snippet }: SnipPreviewProps) {
  const { title, id, owner_id, snip, description, created_at } = snippet;
  const date = new Date(`${created_at}`);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="my-5">
      <div className="flex justify-between items-end">
        <h2 className="font-semibold text-lg">{title}</h2>
        <div className="text-xs">Snipped {formatDate(date)} by Brad</div>
      </div>
      <div className="my-1 rounded-xl">
        <SyntaxHighlighter
          language="javascript"
          style={docco}
          className="rounded-xl"
          showLineNumbers={true}
        >
          {snip}
        </SyntaxHighlighter>
      </div>
      {showMore && <div className="basis-full">{description}</div>}
      <div className="flex justify-between items-end">
        <button
          className="text-xs hover:text-indigo-300"
          onClick={() => setShowMore(!showMore)}
        >
          Show {showMore ? "less" : "More"}
        </button>
        <div className="flex gap-3 text-xs ">
          <button>Comment</button>
          <button>Like</button>
          <button>Share</button>
        </div>
      </div>
    </div>
  );
}

export default SnipPreview;