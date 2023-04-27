"use client";

import { Snip } from "@/lib/database";
import React, { useState, useEffect, cache } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useSupabase } from "../utils/browserClient";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Comment from "./comment";
import { Comment as CommentType } from "../lib/database";

type SnipPreviewProps = {
  snippet: Snip;
  comments: CommentType[];
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function SnipPreview({ snippet, comments }: SnipPreviewProps) {
  const { title, id, author, snip, description, created_at, owner_id } =
    snippet;
  const date = new Date(`${created_at}`);
  const [showMore, setShowMore] = useState(false);
  const supabase = useSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const [showComment, setShowComment] = useState(false);

  const handleDelete = async () => {
    console.log("deleting", id);
    const { data, error } = await supabase.from("snips").delete().eq("id", id);
    error ? console.log(error) : router.refresh();
  };

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      error ? console.log(error) : setSession(data.session);
    };
    getSession();
    console.log(session);
  }, []);

  return (
    <div className="my-5 py-5 border-t  border-indigo-300">
      <div className="flex justify-between items-end">
        <h2 className="font-semibold text-lg">{title}</h2>
        <div className="text-xs">
          Snipped {formatDate(date)} by {author}
        </div>
      </div>
      <div className="my-1 rounded-xl">
        <SyntaxHighlighter
          language="typescript"
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
          {session?.user.id == owner_id && (
            <>
              <button>Edit</button>
              <button onClick={() => handleDelete()}>Delete</button>
            </>
          )}
          <button onClick={() => setShowComment(!showComment)}>Comment</button>
          <button>Like</button>
          <button>Share</button>
        </div>
      </div>
      {showComment && (
        <Comment
          snip_id={id}
          author={`${author}`}
          owner_id={owner_id}
          comments={comments}
          session={session}
        />
      )}
    </div>
  );
}

export default SnipPreview;
