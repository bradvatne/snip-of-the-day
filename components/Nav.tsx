"use client";
import { useState, useEffect, FormEvent } from "react";
import { useSupabase } from "../app/supabase-provider";
import { Session } from "@supabase/supabase-js";
import AddSnip from "./AddSnip";
import { useRouter } from "next/router";

export default function Nav() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [addSnip, setAddSnip] = useState(false);
  const { supabase } = useSupabase();
  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "https://example.com/welcome",
      },
    });
  };

  const signOut = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    const router = useRouter();
    router.reload();
  };

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      error ? console.log(error) : setSession(data.session);
    };

    fetchSession();
  }, []);

  return (
    <nav className="flex justify-between items-end flex-wrap">
      <div className="text-2xl font-bold">Snip of the Day</div>
      {session ? (
        <div className="flex gap-3">
          <button onClick={() => setAddSnip(!addSnip)}>Add a Snip</button>
          <button onClick={(e) => signOut(e)}>Sign Out</button>
        </div>
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
      {addSnip && <AddSnip />}
    </nav>
  );
}
