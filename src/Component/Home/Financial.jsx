import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import FinancialImage from "../../assets/financial.webp";

const Financial = () => {
  const [typeText] = useTypewriter({
    words: ["Simplify", "Secure", "Track", "Empower"],
    loop: true,
    typeSpeed: 90,
    deleteSpeed: 60,
    delaySpeed: 1200,
  });

  return (
    <section className="py-24 md:py-36 bg-gradient-to-br from-base-100 to-base-200 dark:from-base-200 dark:to-base-300 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/*Animated Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <h2 className="text-5xl md:text-6xl font-extrabold text-base-content leading-tight mb-4">
              {typeText}
              <span className="text-cyan-600 dark:text-cyan-400">
                <Cursor cursorStyle="|" cursorColor="#06B6D4" />
              </span>
            </h2>
            <h2 className="text-5xl md:text-6xl font-extrabold text-base-content leading-tight mb-8">
              Your Finances.
            </h2>

            <p className="mt-6 text-xl text-base-content/80 max-w-lg mx-auto lg:mx-0 border-l-4 border-cyan-500 pl-4 py-1 shadow-md rounded-r-md">
              Gain full control with **BillManager Pro**. We leverage a secure
              MERN stack to deliver insights and reliable payment functionality
              for all your utility services.
            </p>
          </div>

          <div className="lg:w-1/2 flex justify-center relative">
            <div className="absolute w-3/4 h-3/4 bg-cyan-600/20 dark:bg-cyan-500/30 rounded-full blur-3xl -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70"></div>

            {/* Image Container */}
            <div className="relative w-full max-w-[600px] h-[400px] rounded-3xl overflow-hidden shadow-2xl transition duration-500 transform hover:scale-[1.02] border-4 border-cyan-500/50 cursor-pointer">
              <img
                src={FinancialImage}
                alt="Growing Financial Digitization"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Financial;
