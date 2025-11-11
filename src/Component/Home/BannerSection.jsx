import React from "react";
import { Link } from "react-router-dom";
// 🔑 Import the necessary hook and component from the package
import { useTypewriter, Cursor } from "react-simple-typewriter";

const BannerSection = () => {
  // 🔑 Use the hook to define the rotating text messages
  const [text] = useTypewriter({
    words: [
      "All Bills, One Dashboard.",
      "Pay Only Current Month Bills.",
      "Secure Your Financial Data.",
      "Download Your Payment History.",
    ],
    loop: true, // Loop the typing animation indefinitely
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  return (
    <section className="relative overflow-hidden pt-20 pb-32 lg:pt-28 lg:pb-40 bg-base-300 dark:bg-base-200 rounded-2xl shadow-2xl border border-base-300/50">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Primary Static Heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-base-content leading-tight mb-4">
            Seamlessly Manage <br /> Your{" "}
            <span className="text-cyan-600">Utility Bills</span>
          </h1>

          {/* 🔑 Dynamic Typing Effect */}
          <div className="text-2xl md:text-3xl font-semibold text-base-content/90 h-10 mb-8 max-w-3xl mx-auto">
            <span className="text-cyan-700 dark:text-cyan-400 font-bold">
              {text}
            </span>
            {/* Cursor component provides the blinking cursor effect */}
            <Cursor cursorStyle="|" cursorColor="#06B6D4" />
          </div>

          <Link
            to="/bills"
            className="inline-block px-10 py-3 bg-cyan-600 text-white font-semibold text-lg rounded-full shadow-lg shadow-cyan-500/50 hover:bg-cyan-700 transform hover:scale-[1.03] transition duration-300 ease-in-out"
          >
            View All Bills
          </Link>
        </div>
      </div>

      {/* Unique Background Graphic */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          {/* ... (SVG path remains the same for background aesthetics) ... */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "var(--p)", stopOpacity: 0.5 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "var(--p)", stopOpacity: 0.1 }}
              />
            </linearGradient>
          </defs>
          <path
            fill="url(#gradient)"
            d="M0,192L60,186.7C120,181,240,171,360,176C480,181,600,203,720,192C840,181,960,139,1080,117.3C1200,96,1320,96,1380,96L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default BannerSection;
