import React, { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile, // 🔑 Import updateProfile for registration
} from "firebase/auth";
import app from "../Firebase/Firebase.config";
import axios from "axios";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext(null);

// ⚠️ IMPORTANT: Set your Server Base URL here for easy maintenance
const SERVER_BASE_URL = "http://localhost:5000"; // Change to your Vercel URL upon deployment

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Create User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 2. Update User Profile (for Register page)
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // 3. Login
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 4. Logout
  const logOut = () => {
    // Clear token and sign out (ensures PrivateRoute correctly sees user as null)
    localStorage.removeItem("utility-token");
    setLoading(true); // Set loading to true while Firebase logs out
    return signOut(auth);
  };

  // 5. Google Sign In
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 6. JWT Fetch Logic (Helper function)
  const fetchAndSetToken = (currentUser) => {
    if (currentUser) {
      // Use Axios to call your JWT endpoint
      axios
        .post(`${SERVER_BASE_URL}/jwt`, { email: currentUser.email })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("utility-token", res.data.token);
          }
        })
        .catch((error) => {
          console.error("JWT fetch error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // No user found, finish loading state.
      setLoading(false);
    }
  };

  // 7. State Observer (Handles persistence and token)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // User is present, fetch their token
        fetchAndSetToken(currentUser);
      } else {
        // User is null (logged out or initially null), clear token if present
        localStorage.removeItem("utility-token");
        setLoading(false); // Can set loading false immediately if no token fetch is needed
      }
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  // 8. 🔑 Axios Interceptor (Optional but crucial for securing backend API calls)
  useEffect(() => {
    const token = localStorage.getItem("utility-token");

    // The interceptor runs before every Axios request
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          // Attach the token to the Authorization header
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Clean up the interceptor when the component unmounts or dependencies change
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [user, loading]); // Rerun if user or loading changes, ensuring token is checked

  const authData = {
    user,
    createUser,
    updateUserProfile, // 🔑 Added profile update
    signIn,
    logOut,
    loading,
    googleSignIn,
    SERVER_BASE_URL, // 🔑 Added BASE_URL for other components
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
