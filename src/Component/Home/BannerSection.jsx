import React from "react";
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Bannerimage from "../../assets/banner.webp";
// Removed 'PlayCircle' icon import

const BannerSection = () => {
  // 🔑 Dynamic Typing Effect
  const [text] = useTypewriter({
    words: [
      "All Bills, One Dashboard.",
      "Pay Only Current Month Bills.",
      "Secure Your Financial Data.",
      "Download Your Payment History.",
    ],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  return (
    // Asymmetrical layout and light blue background
    <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-32 bg-cyan-50/70 dark:bg-base-200 ">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* --- Left Column: Text and CTA --- */}
          <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            {/* Static Heading */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-base-content leading-tight mb-4">
              Seamlessly Manage <br /> Your{" "}
              <span className="text-cyan-700 dark:text-cyan-400">
                Utility Bills
              </span>
            </h1>

            {/* Dynamic Typing Effect */}
            <div className="text-2xl md:text-3xl font-semibold text-base-content/90 h-10 mb-8">
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                {text}
              </span>
              <Cursor cursorStyle="|" cursorColor="#06B6D4" />
            </div>

            {/* Static Description Text */}
            <p className="text-base-content/70 mb-8 max-w-md mx-auto lg:mx-0">
              Stop worrying about due dates. Track, pay, and organize your
              Electricity, Gas, and Water bills in one secure digital dashboard.
            </p>

            {/* 🔑 CTA Button (Simplified: Only "Get Started") */}
            <div className="flex justify-center lg:justify-start">
              <Link
                to="/bills"
                className="inline-block px-10 py-3 bg-cyan-600 text-white font-semibold text-lg rounded-lg shadow-lg shadow-cyan-500/50 hover:bg-cyan-700 transition duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* --- Right Column: Image and Geometry --- */}
          <div className="relative w-full h-[450px] flex items-center justify-center">
            {/* 🔑 Image Container with Geometric Crop (Simulated) */}
            <div className="absolute w-[400px] h-[400px] bg-white rounded-3xl shadow-2xl rotate-45 overflow-hidden border-8 border-white dark:border-base-300/50">
              <img
                src={Bannerimage}
                alt="User paying bills with card"
                className="w-full h-full object-cover -rotate-45 scale-125"
              />
            </div>

            {/* Decorative Dots and Circles */}
            <div className="absolute w-20 h-20 bg-cyan-200/50 rounded-full blur-sm top-10 left-5 hidden md:block"></div>
            <div className="absolute w-12 h-12 border-4 border-cyan-300 rounded-full bottom-10 right-10 hidden md:block"></div>
            <div className="absolute text-cyan-400 dark:text-cyan-300/50 text-5xl font-extrabold rotate-12 top-5 right-10 opacity-50">
              ...
            </div>
          </div>
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
        >
          <path fill="url(#pattern)" d="M0,0L1440,0L1440,800L0,800Z"></path>
          <defs>
            <pattern
              id="pattern"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <path d="M-10,30h80" stroke="#06B6D4" strokeWidth="1"></path>
            </pattern>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default BannerSection;
