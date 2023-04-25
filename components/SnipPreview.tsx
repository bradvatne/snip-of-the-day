'use client'

import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const codeString = `const hello = () => {
  console.log('hello')
}`;
function SnipPreview() {
  return (
    <div className="my-2">
      <div className="flex justify-between items-end">
        <h2 className="font-semibold">
          Witty title for code snippet goes here
        </h2>
        <div className="">Snipped Today by Brad</div>
      </div>
      <div className="my-1 rounded-xl">
        <SyntaxHighlighter language="javascript" style={docco} className="rounded-xl">
          {codeString}
        </SyntaxHighlighter>
      </div>
      <div className="flex justify-between items-end">
        <h2 className="">Show more</h2>
        <div className="flex gap-3">
          <button>Comment</button>
          <button>Like</button>
          <button>Share</button>
        </div>
      </div>
    </div>
  );
}

export default SnipPreview;
