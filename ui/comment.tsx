"use client";
import React, { useState, useEffect } from "react";
import { useSupabase } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { Comment as CommentType } from "@/lib/database";
import { Session } from "@supabase/supabase-js";

type CommentProps = {
  snip_id: number;
  owner_id: string;
  author: string;
  comments: CommentType[];
  session: Session | null;
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Comment = ({
  snip_id,
  author,
  owner_id,
  comments,
  session,
}: CommentProps) => {
  const [comment, setComment] = useState<string>("");
  const supabase = useSupabase();
  const router = useRouter();

  const submitComment = async () => {
    if (comment.length < 1 || session === null) {
      alert("Please login and fill out the comment form before submiting");
      return;
    }

    const { data, error } = await supabase.from("comments").insert({
      snip_id: snip_id,
      author: author,
      owner_id: owner_id,
      content: comment,
    });
    error ? console.log(error) : console.log(data);
    if (!error) {
      setComment("");
      router.refresh();
    }
  };
  return (
    <div className="my-2">
      <div className="flex flex-col">
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded-md p-2 border border-solid border-gray-400"
          placeholder="Add your comment..."
          disabled={session === null ? true : false}
        ></textarea>
        <div className="flex justify-between">
          <span>Posting as {author}</span>{" "}
          <button
            className="px-5 rounded justify-self-end ml-2"
            onClick={() => submitComment()}
          >
            Post
          </button>
        </div>
      </div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div className="flex justify-between items-end mt-2">
            <span>{comment.author} commented</span>
            <span className="text-xs">
              {formatDate(new Date(comment.created_at))}
            </span>
          </div>
          <div className="bg-pink-100 rounded p-1 ">{comment.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
