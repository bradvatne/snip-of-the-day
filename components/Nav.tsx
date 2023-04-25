"use client";
import { useState, useEffect, FormEvent } from "react";
import { useSupabase } from "../app/browserClient";
import { Session } from "@supabase/supabase-js";
import AddSnip from "./AddSnip";

export default function Nav() {
  const [checkEmail, setCheckEmail] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [addSnip, setAddSnip] = useState(false);
  const { supabase } = useSupabase();

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

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      error ? console.log(error) : setSession(data.session);
    };
    const fetchUser = async () => {
      const { data, error } = await supabase.from("profiles").select().single();
      error ? console.log(error) : setUser(data.first_name);
    };

    fetchSession();
    fetchUser();
  }, []);

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
      {addSnip && <AddSnip session={session} user={user} />}
    </nav>
  );
}
