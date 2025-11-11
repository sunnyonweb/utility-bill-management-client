import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loader from "./Loader";
import axios from "axios";

// This component handles the actual logic of applying the Authorization header.
const TokenWaiter = ({ children }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    // If AuthProvider is still loading the session, do nothing.
    if (authLoading) return;

    let token = localStorage.getItem("utility-token");

    if (user && token) {
      // User and token exist: ready to proceed.
      setIsTokenReady(true);
    } else if (user && !token) {
      // User exists but token is missing (usually means JWT fetch failed).
      // You may handle a soft re-authentication here, but for now, we show the loader.
      setIsTokenReady(false);
    } else {
      // User is logged out.
      setIsTokenReady(true);
    }
  }, [user, authLoading]);

  // If we're still loading the auth state OR waiting for the token to be confirmed, show loader.
  if (authLoading || (user && !isTokenReady)) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default TokenWaiter;
