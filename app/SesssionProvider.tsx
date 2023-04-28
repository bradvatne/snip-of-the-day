"use client";
import {
  useEffect,
  useState,
  useContext,
  createContext,
  ReactElement,
} from "react";
import { Session } from "@supabase/auth-helpers-nextjs";
import { User } from "@/lib/database";
import { useSupabase } from "../lib/supabase-browser";

type ContextProps = {
  session: Session | null;
  user: User | null;
};
const SessionContext = createContext<ContextProps | null>(null);

export const useSession = () => {
  return useContext(SessionContext);
};

const SessionProvider = ({
  children,
}: {
  children: ReactElement | undefined;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const supabase = useSupabase();

  useEffect(() => {
    // Listen for session changes and update the state
    const sessionListener = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
      }
    );

    // Cleanup the listener on unmount
    return () => {
      sessionListener.data.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase
        .from("profiles")
        .select()
        .eq("id", session?.user.id)
        .single();
      setUser(data);
    };
    getUser();
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, user }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
