import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // Theme Toggle
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleToggle = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.info("Logged out successfully.");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
        toast.error("Logout failed. Please try again.");
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-cyan-600 font-bold"
              : "text-base-content hover:text-cyan-600"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/bills"
          className={({ isActive }) =>
            isActive
              ? "text-cyan-600 font-bold"
              : "text-base-content hover:text-cyan-600"
          }
        >
          Bills
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/my-pay-bills"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-600 font-bold"
                  : "text-base-content hover:text-cyan-600"
              }
            >
              My Pay Bills
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="shadow-md bg-base-100 border-b border-base-200 sticky top-0 z-50">
      <div className="navbar container mx-auto px-4 py-2">
        {/* LOGO  */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-base-content"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-300"
            >
              {navLinks}
            </ul>
          </div>

          <Link
            to="/"
            className="btn btn-ghost text-xl font-extrabold text-cyan-600 hover:bg-transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mr-1"
            >
              <path d="M11.472 3.96a.75.75 0 0 1 1.056 0l7.25 7.25c.42.42.173 1.135-.353 1.135H5.475c-.526 0-.773-.715-.353-1.135l7.25-7.25Z" />
              <path
                fillRule="evenodd"
                d="M3.75 19.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75Zm0-4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75Zm.75-6a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h15a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-.75-.75H4.5Z"
                clipRule="evenodd"
              />
            </svg>
            BillManager
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2 text-base font-medium">
            {navLinks}
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-end space-x-3">
          {/* Theme Toggle */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              value={theme}
              onChange={handleToggle}
              checked={theme === "dark"}
            />

            {/* Sun icon */}
            <svg
              className="swap-off h-6 w-6 fill-current text-yellow-500 hover:text-amber-600 transition"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* Moon icon  */}
            <svg
              className="swap-on h-6 w-6 fill-current text-cyan-600 hover:text-cyan-700 transition"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {user ? (
            // AFTER LOGIN
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-cyan-500"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt={user.displayName || "User Profile"}
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/6803h0K/default-profile.png"
                    }
                    title={user.displayName}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-300 text-base-content"
              >
                <li>
                  <span className="font-semibold text-base-content">
                    {user.displayName || "User"}
                  </span>
                </li>
                <li className="font-medium text-base-content">
                  <span className="truncate text-xs">{user.email}</span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // BEFORE LOGIN
            <div className="space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 border border-cyan-500 text-cyan-600 rounded-md hover:bg-cyan-50 transition duration-150 ease-in-out font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition duration-150 ease-in-out font-medium hidden md:inline-block"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
