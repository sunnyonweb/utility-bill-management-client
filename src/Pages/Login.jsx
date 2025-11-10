import React, { useContext, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; // 🔑 Need axios for the MERN JWT process
import { AuthContext } from "../AuthProvider/AuthProvider";

const Login = () => {
  // 🔑 Access required functions and base URL from AuthContext
  const { signIn, googleSignIn, SERVER_BASE_URL } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Determine where to redirect after successful login
  const from = location.state?.from?.pathname || "/";

  // 🔑 Helper to save user (if first time login via Google) and rely on AuthProvider to fetch JWT
  const saveUserAndNavigate = async (user) => {
    const userToSave = {
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
      role: "user",
    };

    try {
      // POST user data to MongoDB (The backend handles checking if the user already exists)
      await axios.post(`${SERVER_BASE_URL}/users`, userToSave);

      toast.success(
        `Login successful! Welcome back, ${userToSave.name || "User"}.`
      );
      navigate(from, { replace: true });
    } catch (dbError) {
      console.error("DB Sync/JWT Error:", dbError);
      toast.warning(
        "Login successful, but failed to synchronize data with the server."
      );
      navigate(from, { replace: true });
    }
  };

  // --- 1. Email/Password Login Handler ---
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        // If sign-in is successful, the AuthProvider's useEffect handles the JWT fetching
        const user = result.user;
        toast.success(`Login successful! Redirecting...`);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Login Error:", error.message);
        const errorMessage = error.message;
        let errorToDisplay = "Login failed. Please check your credentials.";

        if (errorMessage.includes("user-not-found")) {
          errorToDisplay = "No account found with this email.";
        } else if (errorMessage.includes("wrong-password")) {
          errorToDisplay = "Invalid password. Please try again.";
        }

        // Show error using toast
        toast.error(errorToDisplay);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // --- 2. Google Sign-In Handler ---
  const handleGoogleSignIn = () => {
    setLoading(true);

    googleSignIn()
      .then((result) => {
        const user = result.user;
        // If successful, save/sync user data to MongoDB and navigate
        saveUserAndNavigate(user);
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message);
        toast.error("Google sign-in failed or was cancelled.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
          <div className="text-center mb-6">
            {/* Title: Login */}
            <h1 className="text-4xl font-extrabold text-gray-800">
              User Login
            </h1>
            <p className="text-gray-500 mt-2">
              Access your Bill Management Dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <fieldset disabled={loading}>
              {/* Email */}
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 ease-in-out"
                placeholder="Email address"
                required
              />

              {/* Password */}
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 ease-in-out"
                placeholder="Password"
                required
              />

              {/* Forget Password Link */}
              <div className="text-sm text-right">
                {/* 🚫 Note: Forget Password logic is NOT implemented as per assignment rules, so this link is placeholder */}
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:text-cyan-700"
                >
                  Forget Password?
                </a>
              </div>

              {/* Login button */}
              <button
                type="submit"
                className="w-full mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-150 ease-in-out disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="flex items-center justify-center gap-4 my-6">
                <div className="h-px flex-grow bg-gray-300"></div>
                <span className="text-sm text-gray-500">OR</span>
                <div className="h-px flex-grow bg-gray-300"></div>
              </div>

              {/* Google Social Login */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition duration-150 ease-in-out disabled:opacity-50"
                type="button"
                disabled={loading}
              >
                <img
                  src="https://docs.material-tailwind.com/icons/google.svg"
                  alt="Google logo"
                  className="h-5 w-5 mr-2"
                />
                Sign in with Google
              </button>
            </fieldset>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              className="font-semibold text-cyan-600 hover:text-cyan-700"
              to={"/register"}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
