"use client";
import { useState, useEffect, FormEvent } from "react";
import { createClient, Session } from "@supabase/supabase-js";

export default function Nav() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const supabase = createClient(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
    `${process.env.NEXT_PUBLIC_SUPABASE_KEY}`
  );
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "https://example.com/welcome",
      },
    });
  };

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      error ? console.log(error) : setSession(data.session);
    };

    fetchSession();
  }, []);

  return (
    <nav className="flex justify-between items-end">
      <div className="text-2xl font-bold">Snip of the Day</div>
      {session ? (
        <button>Add a Snip</button>
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
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            sign in
          </button>
        </form>
      )}
    </nav>
  );
}
