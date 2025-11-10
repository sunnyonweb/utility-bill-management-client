import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";

const Register = () => {
  // Correctly using useContext to access context values
  const { createUser, updateUserProfile, googleSignIn, SERVER_BASE_URL } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const saveUserAndNavigate = async (user, name, photo) => {
    const userToSave = {
      email: user.email,
      name: name || user.displayName,
      photo: photo || user.photoURL,
      role: "user",
    };

    try {
      await axios.post(`${SERVER_BASE_URL}/users`, userToSave);

      toast.success(
        `Registration successful! Welcome, ${userToSave.name || "User"}.`
      );
      navigate("/");
    } catch (dbError) {
      console.error("DB Save/JWT Error:", dbError);
      toast.warning(
        "Account created, but failed to synchronize profile data with the server."
      );
      navigate("/");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    let validationError = "";

    // Validation checks
    if (password.length < 6) {
      validationError = "Password length must be at least 6 characters.";
    } else if (!/[A-Z]/.test(password)) {
      validationError = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      validationError = "Password must contain at least one lowercase letter.";
    }

    if (validationError) {
      toast.error(validationError);
      setLoading(false);
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(name, photo)
          .then(() => {
            saveUserAndNavigate(user, name, photo);
          })
          .catch((error) => {
            console.error("Profile Update Error:", error);
            toast.warning(
              "Registration successful, but profile picture/name update failed."
            );
            saveUserAndNavigate(user, name, photo);
          });
      })
      .catch((error) => {
        console.error("Registration Error:", error.message);
        const errorMessage = error.message;
        let errorToDisplay = "Registration failed. Please try again.";

        if (errorMessage.includes("email-already-in-use")) {
          errorToDisplay = "This email address is already registered.";
        }

        toast.error(errorToDisplay);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);

    googleSignIn()
      .then((result) => {
        const user = result.user;
        saveUserAndNavigate(user, user.displayName, user.photoURL);
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
            <h1 className="text-4xl font-extrabold text-gray-800">
              Create Account
            </h1>
            <p className="text-gray-500 mt-2">
              Manage your utility bills easily.
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <fieldset disabled={loading}>
              {/* name */}
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                name="name"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 ease-in-out"
                placeholder="Your Name"
                required
              />

              {/* photo url */}
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Photo URL
              </label>
              <input
                name="photo"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 ease-in-out"
                placeholder="Photo URL"
                required
              />

              {/* email */}
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 ease-in-out"
                placeholder="Email"
                required
              />

              {/* password */}
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 ease-in-out"
                placeholder="Password (Min 6 chars, 1 Uppercase, 1 Lowercase)"
                required
              />

              {/* submit button */}
              <button
                type="submit"
                className="w-full mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-150 ease-in-out disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Registering..." : "Sign Up"}
              </button>

              <div className="flex items-center justify-center gap-4 my-6">
                <div className="h-px flex-grow bg-gray-300"></div>
                <span className="text-sm text-gray-500">OR</span>
                <div className="h-px flex-grow bg-gray-300"></div>
              </div>

              {/* google signup */}
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
                Sign up with Google
              </button>
            </fieldset>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              className="font-semibold text-cyan-600 hover:text-cyan-700"
              to={"/login"}
            >
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
