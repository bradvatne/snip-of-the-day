"use client";
import { useState, useEffect, FormEvent } from "react";
import { useSupabase } from "../utils/browserClient";
import { Session } from "@supabase/supabase-js";
import AddSnip from "./add-snip";

export default function Nav() {
  const [checkEmail, setCheckEmail] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [addSnip, setAddSnip] = useState(false);
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

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data !== null) {
        setSession(data.session);
        const res = await supabase
          .from("profiles")
          .select()
          .eq("id", data && data.session && data.session.user.id)
          .single();
        setUser(res && res.data && res.data && res.data.first_name);
        console.log(res, "here");
      }
    };
    fetchSession();
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
      {addSnip && (
        <AddSnip
          session={session}
          user={user}
          addSnip={addSnip}
          setAddSnip={setAddSnip}
        />
      )}
    </nav>
  );
}
