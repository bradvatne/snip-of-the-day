"use client";
import { useState, useEffect, FormEvent } from "react";
import { useSupabase } from "../lib/supabase-browser";
import AddSnip from "./add-snip";
import { useSession } from "../app/SesssionProvider";

export default function Nav() {
  const [checkEmail, setCheckEmail] = useState(false);
  const [addSnip, setAddSnip] = useState(false);

  const [email, setEmail] = useState<string>("");
  const sessionContext = useSession();
  const session = (sessionContext?.session);
  const user = (sessionContext?.user);

  const supabase = useSupabase();
  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
    });
    !error && setCheckEmail(true);
  };

  const signOut = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
  };

  return (
    <nav
      className="flex justify-between items-end flex-wrap"
      onClick={() => console.log(user)}
    >
      <div className="text-2xl font-bold">Snip of the Day ✂️</div>
      {session && !checkEmail ? (
        <div className="flex gap-3">
          <button onClick={() => setAddSnip(!addSnip)}>
            {addSnip ? "Close Snip Editor" : "Add New Snip"}
          </button>
          <button onClick={(e) => signOut(e)}>Sign Out</button>
        </div>
      ) : checkEmail ? (
        <div>Login Email Sent...</div>
      ) : (
        <form className="">
          <label htmlFor="email" className="hidden">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
            type="text"
            placeholder="email"
          />
          <button type="submit" onClick={(e) => signIn(e)}>
            Sign in
          </button>
        </form>
      )}
      {addSnip && (
        <AddSnip
          user={user}
          session={session}
          addSnip={addSnip}
          setAddSnip={setAddSnip}
        />
      )}
    </nav>
  );
}
