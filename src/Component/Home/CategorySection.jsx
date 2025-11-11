import React from "react";
import { Link } from "react-router-dom";

const CategorySection = () => {
  const categories = [
    {
      name: "Electricity",
      icon: "⚡",
      color: "bg-yellow-500",
      link: "/bills?category=Electricity",
    },
    {
      name: "Gas",
      icon: "🔥",
      color: "bg-red-500",
      link: "/bills?category=Gas",
    },
    {
      name: "Water",
      icon: "💧",
      color: "bg-blue-500",
      link: "/bills?category=Water",
    },
    {
      name: "Internet",
      icon: "🌐",
      color: "bg-indigo-500",
      link: "/bills?category=Internet",
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-base-content text-center mb-10">
        Quick Access Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={cat.link}
            className="group p-6 text-center bg-base-100 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border border-base-300"
          >
            <div
              className={`mx-auto w-16 h-16 ${cat.color} rounded-full flex items-center justify-center mb-4 shadow-md group-hover:shadow-xl`}
            >
              <span className="text-2xl">{cat.icon}</span>
            </div>
            <h3 className="text-xl font-semibold text-base-content group-hover:text-cyan-600">
              {cat.name}
            </h3>
            <p className="text-sm text-base-content/60 mt-1">Check Bills</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
