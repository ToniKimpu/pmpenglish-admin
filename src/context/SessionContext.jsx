import React, { createContext, useContext, useEffect, useState } from "react";
import LoadingPage from "../features/LoadingPage";
import { supabase } from "../services/supabaseClient";

const SessionContext = createContext(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error(
      "Session context is undefined. Ensure that useSession is used within a SessionProvider."
    );
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setIsLoading(false);
      }
    );

    const timeout = setTimeout(() => {
      setIsLoading(false); // Fallback in case listener fails
    }, 5000);

    return () => {
      clearTimeout(timeout);
      authStateListener.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session }}>
      {isLoading ? <LoadingPage /> : children}
    </SessionContext.Provider>
  );
};
