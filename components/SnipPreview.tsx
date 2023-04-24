import React from "react";

function SnipPreview() {
  return (
    <div className="my-2">
      <div className="flex justify-between items-end leading-tight">
        <h2 className="font-semibold">
          Witty title for code snippet goes here
        </h2>
        <div className="text-sm italic">Snipped Today by Brad</div>
      </div>
      <div className="my-1 rounded-md bg-slate-800 p-6 text-white font-mono">
        Code Snippet Goes Here
      </div>
      <div className="flex justify-between items-end leading-tight">
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
