import React from "react";
import { useState, useEffect } from "react";
import { useSupabase } from "../app/browserClient";
import { Session } from "@supabase/supabase-js";

type AddSnipProps = {
  session: Session | null;
  user: string | null;
};

const AddSnip = ({ session, user }: AddSnipProps) => {
  const { supabase } = useSupabase();
  const [title, setTitle] = useState("");
  const [snip, setSnip] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from("snips").insert({
      title,
      snip,
      description,
      language,
      owner_id: session?.user.id,
    });
    error ? console.log(error) : console.log("success!", data);
    if (!error) {
      setTitle("");
      setSnip("");
      setDescription("");
      setLanguage("");
    }
  };

  return (
    <form className="basis-full flex flex-col p-4 bg-teal-100 rounded-lg my-4">
      <div className="flex justify-between">
        <label htmlFor="title">Title</label>
        <div>0/60</div>
      </div>
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        name="title"
        id="title"
        value={title}
        className="w-full rounded p-1 mb-3"
        placeholder="Title your snippet here..."
      ></input>
      <div className="flex justify-between">
        <label htmlFor="snip">Code Snippet</label>
        <div>0/500</div>
      </div>
      <textarea
        onChange={(e) => setSnip(e.target.value)}
        name="snip"
        id="snip"
        value={snip}
        className="w-full rounded p-1 mb-3"
        placeholder="Paste your snippet here..."
      ></textarea>
      <div className="flex justify-between">
        <label htmlFor="description">Description</label>
        <div>0/5000</div>
      </div>
      <textarea
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded p-1 mb-3"
        placeholder="Talk about what you learned here..."
      ></textarea>
      <div className="flex justify-between items-end">
        {user === null ? (
          <input type="text" className="rounded p-1" />
        ) : (
          `Posting as ${user}`
        )}
        <div className="flex gap-3 items-end">
          <label htmlFor="language">Language:</label>
          <select
            className="p-1 rounded"
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            <option value="Javascript">Javascript</option>
          </select>
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-white px-2 py-1 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddSnip;
