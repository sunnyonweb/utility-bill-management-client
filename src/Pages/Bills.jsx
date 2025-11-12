import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loader from "../Component/Loader";
import BillCard from "../Component/Home/BillCard";

// --- New Bills  ---
const BillsHero = () => (
  <div className="py-16 px-4 mb-8 bg-base-300 dark:bg-base-300/70 rounded-xl shadow-lg border-l-4 border-cyan-600 transition duration-300">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-extrabold text-base-content mb-3">
        Your Bill Center
      </h1>
      <p className="text-lg text-base-content/80">
        Browse, filter, and review all available utility bills. Use the category
        filter below to quickly find what you need.
      </p>
    </div>
  </div>
);

const Bills = () => {
  const { SERVER_BASE_URL } = useContext(AuthContext);
  const [allBills, setAllBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);

  const categories = ["Electricity", "Gas", "Water", "Internet"];

  useEffect(() => {
    setLoading(true);
    setError(null);

    const apiUrl = selectedCategory
      ? `${SERVER_BASE_URL}/bills?category=${selectedCategory}`
      : `${SERVER_BASE_URL}/bills`;

    axios
      .get(apiUrl)
      .then((res) => {
        setAllBills(res.data);
      })
      .catch((err) => {
        console.error("Error fetching filtered bills:", err);
        toast.error(`Failed to load bills: ${err.message}`);
        setError("Could not fetch bills. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [SERVER_BASE_URL, selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="min-h-screen bg-base-100 dark:bg-base-200 py-10">
      <div className="container mx-auto px-4">
        {/*  Hero Section  */}
        <BillsHero />

        <div className="flex flex-col md:flex-row items-center justify-center bg-base-300 dark:bg-base-300/50 p-4 rounded-lg shadow-md mb-8 max-w-lg mx-auto">
          <label
            htmlFor="category-filter"
            className="text-lg font-semibold text-base-content mb-2 md:mb-0 md:mr-4"
          >
            Filter by Category:
          </label>
          <select
            id="category-filter"
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="select select-bordered w-full md:max-w-xs bg-base-100 dark:bg-base-200 text-base-content border-gray-400 focus:border-cyan-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* --- Bill Display Area --- */}
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-center text-red-500 text-xl p-10 bg-base-300 rounded-lg shadow">
            {error}
          </p>
        ) : allBills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBills.map((bill) => (
              <BillCard key={bill._id} bill={bill} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-base-content/70 p-10 bg-base-300 rounded-lg shadow">
            No bills found for the selected category: **
            {selectedCategory || "All"}**.
          </p>
        )}
      </div>
    </div>
  );
};

export default Bills;
