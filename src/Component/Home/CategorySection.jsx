import React from "react";
import { Link } from "react-router-dom";

const CategorySection = () => {
  const categories = [
    {
      name: "Electricity",
      icon: "⚡",
      color: "bg-yellow-500",
      accent: "hover:bg-yellow-100 dark:hover:bg-yellow-500/10",
      link: "/bills?category=Electricity",
    },
    {
      name: "Gas",
      icon: "🔥",
      color: "bg-red-500",
      accent: "hover:bg-red-100 dark:hover:bg-red-500/10",
      link: "/bills?category=Gas",
    },
    {
      name: "Water",
      icon: "💧",
      color: "bg-blue-500",
      accent: "hover:bg-blue-100 dark:hover:bg-blue-500/10",
      link: "/bills?category=Water",
    },
    {
      name: "Internet",
      icon: "🌐",
      color: "bg-indigo-500",
      accent: "hover:bg-indigo-100 dark:hover:bg-indigo-500/10",
      link: "/bills?category=Internet",
    },
  ];

  return (
    <section className="py-16 bg-base-100 dark:bg-base-200">
      <h2 className="text-3xl font-extrabold text-base-content text-center mb-12 border-b-2 border-cyan-600/50 inline-block px-4 pb-1">
        Keep Your Bills Organized
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={cat.link}
            className={`group p-8 text-center bg-base-100 dark:bg-base-300 rounded-xl shadow-2xl transition duration-300 border border-base-300/50 ${cat.accent}`}
          >
            <div
              className={`mx-auto w-20 h-20 ${cat.color} rounded-full flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl transition duration-200`}
            >
              <span className="text-3xl text-white">{cat.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-base-content group-hover:text-cyan-600 transition duration-200">
              {cat.name}
            </h3>
            <p className="text-base-content/60 mt-1">Check Bills</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
