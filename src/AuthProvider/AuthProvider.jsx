import React, { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/Firebase.config";
import axios from "axios";
import { toast } from "react-toastify";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext(null);

// ✅ Port is correctly set to 4000
const SERVER_BASE_URL = "http://localhost:4000";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    localStorage.removeItem("utility-token");
    setLoading(true);
    return signOut(auth);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 🔑 Function to fetch and set the Custom JWT
  const fetchAndSetToken = async (currentUser) => {
    if (!currentUser.email) {
      setLoading(false);
      return;
    }

    try {
      // Calls the server's /jwt endpoint to get the custom token
      const res = await axios.post(`${SERVER_BASE_URL}/jwt`, {
        email: currentUser.email,
      });
      if (res.data.token) {
        // Save the custom JWT token signed by your server
        localStorage.setItem("utility-token", res.data.token);
      }
    } catch (error) {
      console.error("JWT fetch error:", error);
      toast.error("Failed to secure session. Please try logging in again.");
    }
    setLoading(false);
  };

  // 🔑 State Observer (Handles login, registration, and refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // User logged in: fetch the custom JWT
        fetchAndSetToken(currentUser);
      } else {
        // User logged out
        localStorage.removeItem("utility-token");
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // 🔑 CORRECTED AXIOS INTERCEPTOR: Reads the token synchronously inside the function
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // ✅ FIX: Read the token *synchronously* here to get the LATEST value
        // every time a request is made.
        const token = localStorage.getItem("utility-token");

        if (token) {
          // Header format must be correct for JWT verification
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => {
      // Clean up the interceptor when the component unmounts
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [user, loading]);

  const authData = {
    user,
    createUser,
    updateUserProfile,
    signIn,
    logOut,
    loading,
    googleSignIn,
    SERVER_BASE_URL,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
