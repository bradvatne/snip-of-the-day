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
    const getUser = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", session?.user.id)
        .single();
      setUser(data);
    };

    // Listen for session changes and update the state
    const sessionListener = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (session) {
          getUser();
        } else {
          setUser(null);
        }
      }
    );

    // Cleanup the listener on unmount
    return () => {
      sessionListener.data.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <SessionContext.Provider value={{ session, user }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
