import React from "react";
import { Link } from "react-router-dom";

const BillCard = ({ bill }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Electricity":
        return "border-yellow-500 text-yellow-500";
      case "Gas":
        return "border-red-500 text-red-500";
      case "Water":
        return "border-blue-500 text-blue-500";
      case "Internet":
        return "border-indigo-500 text-indigo-500";
      default:
        return "border-gray-500 text-gray-500";
    }
  };

  if (!bill) {
    return (
      <div className="p-4 bg-base-300 rounded-lg shadow">
        Bill data missing.
      </div>
    );
  }

  const detailsPath = `/bill/${bill._id}`;

  return (
    <div className="bg-base-100 dark:bg-base-300 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 overflow-hidden border border-base-300">
      <div className="h-40 overflow-hidden">
        <img
          src={
            bill.image ||
            "https://via.placeholder.com/400x200?text=Utility+Bill"
          }
          alt={bill.title || "Utility Bill"}
          className="w-full h-full object-cover transition duration-500 hover:scale-110"
        />
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-base-content line-clamp-2 min-h-14">
          {bill.title || "Untitled Bill"}
        </h3>

        <div
          className={`inline-block text-sm font-semibold px-3 py-1 rounded-full border ${getCategoryColor(
            bill.category
          )} bg-base-200`}
        >
          {bill.category || "Uncategorized"}
        </div>

        <div className="text-sm text-base-content/70 flex justify-between items-center pt-2 border-t border-base-200 dark:border-base-content/10">
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            {bill.location || "Unknown Location"}
          </span>
          <span className="font-medium">🗓️ {formatDate(bill.date)}</span>
        </div>

        {bill.amount && (
          <p className="text-2xl font-extrabold text-cyan-600">
            ৳{bill.amount.toLocaleString()}
          </p>
        )}

        <Link
          to={detailsPath}
          className="mt-4 block w-full text-center py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition duration-150"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default BillCard;
