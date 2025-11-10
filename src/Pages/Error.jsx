import React from "react";

import { useRouteError, Link } from "react-router";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-8">
      <div className="text-center max-w-lg bg-base-100 p-10 rounded-xl shadow-2xl">
        <h1 className="text-9xl font-extrabold text-error mb-4">404</h1>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8">
          Oops! The page you are looking for might have been removed, had its
          name changed, or is temporarily unavailable.
        </p>

        <p className="text-sm text-gray-500 mb-6 italic">
          {error.statusText || error.message}
        </p>

        <Link to="/" className="btn btn-primary btn-lg">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
