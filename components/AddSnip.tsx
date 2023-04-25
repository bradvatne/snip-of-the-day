import React from "react";
import { useState, useEffect } from "react";
import { useSupabase } from "../app/supabase-provider";
import { Session } from "@supabase/supabase-js";

type AddSnipProps = {
  session: Session | null;
  user: string | null;
};

const AddSnip = ({ session, user }: AddSnipProps) => {
  const { supabase } = useSupabase();

  const userName = "nobug";
  return (
    <div className="basis-full flex flex-col gap-3 p-4 bg-teal-100 rounded-lg my-4">
      <input
        type="text"
        className="w-full rounded p-1"
        placeholder="Title your snippet here..."
      ></input>
      <textarea
        className="w-full rounded p-1"
        placeholder="Paste your snippet here..."
      ></textarea>
      <textarea
        className="w-full rounded p-1"
        placeholder="Talk about what you learned here..."
      ></textarea>
      <div className="flex justify-between items-end">
        {user == null ? (
          <input type="text" className="rounded p-1" />
        ) : (
          `Posting as ${user}`
        )}
        <div className="flex gap-3">
          <select className="p-1 rounded">
            <option value="Javascript">Javascript</option>
          </select>
          <button className="bg-white px-2 py-1 rounded">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AddSnip;
