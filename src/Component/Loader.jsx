import React from "react";

const Loader = () => {
  return (
    <div className="min-h-[calc(100vh - 100px)] flex justify-center items-center w-full">
      {" "}
      <span className="loading loading-spinner loading-lg text-cyan-600"></span>{" "}
      <p className="ml-3 text-xl font-semibold text-base-content/80">
        Loading...{" "}
      </p>{" "}
    </div>
  );
};

export default Loader;
