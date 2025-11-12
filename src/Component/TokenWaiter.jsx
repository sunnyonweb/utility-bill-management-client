import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loader from "./Loader";

const TokenWaiter = ({ children }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    let token = localStorage.getItem("utility-token");

    if (user && token) {
      setIsTokenReady(true);
    } else if (user && !token) {
      setIsTokenReady(false);
    } else {
      setIsTokenReady(true);
    }
  }, [user, authLoading]);

  if (authLoading || (user && !isTokenReady)) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default TokenWaiter;
