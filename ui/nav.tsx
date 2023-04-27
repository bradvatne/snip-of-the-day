"use client";
import { useState, useEffect, FormEvent } from "react";
import { useSupabase } from "../lib/supabase-browser";
import { Session } from "@supabase/supabase-js";
import { User } from "../lib/database";
import AddSnip from "./add-snip";
import { useSession } from "../app/SesssionProvider";

export default function Nav() {
  const [checkEmail, setCheckEmail] = useState(false);
  const [addSnip, setAddSnip] = useState(false);
  const [session, setSession] = useState<Session | null | undefined>(null);
  const [user, setUser] = useState<User | null | undefined>(null);
  const [email, setEmail] = useState<string>("");
  const sessionContext = useSession();
  const getUser = sessionContext?.user ?? null;
  const getSession = sessionContext?.session ?? null;

  useEffect(() => {
    setSession(getSession);
    setUser(getUser);
  }, [sessionContext]);
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
    setSession(null);
  };

  return (
    <nav
      className="flex justify-between items-end flex-wrap"
      onClick={() => console.log(session)}
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
      {addSnip && <AddSnip addSnip={addSnip} setAddSnip={setAddSnip} />}
    </nav>
  );
}
