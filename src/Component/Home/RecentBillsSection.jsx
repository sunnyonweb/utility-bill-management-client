import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

import Loader from "../Loader";
import BillCard from "./BillCard";

const RecentBillsSection = () => {
  const { SERVER_BASE_URL } = useContext(AuthContext);
  const [recentBills, setRecentBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 10;

  useEffect(() => {
    setLoading(true);

    const fetchBills = () => {
      axios
        .get(`${SERVER_BASE_URL}/bills/recent`)
        .then((res) => {
          setRecentBills(res.data);
          setRetryCount(0);
          setLoading(false);
        })
        .catch((error) => {
          const status = error.response ? error.response.status : null;

          if (status === 503 && retryCount < MAX_RETRIES) {
            setRetryCount((prev) => prev + 1);
          } else {
            console.error("Error fetching recent bills:", error);
            toast.error(
              "Failed to load recent bills from the server after multiple attempts."
            );
            setLoading(false);
          }
        });
    };

    if (retryCount === 0) {
      fetchBills();
    } else {
      
      const timer = setTimeout(fetchBills, 3000);
      return () => clearTimeout(timer);
    }
  }, [SERVER_BASE_URL, retryCount]);

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-base-content border-b-2 border-cyan-600 pb-1">
          Recently Added Bills
        </h2>
        <Link
          to="/bills"
          className="text-cyan-600 hover:text-cyan-700 font-semibold transition"
        >
          View All Bills &rarr;
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : recentBills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentBills.map((bill) => (
            <BillCard key={bill._id} bill={bill} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-base-content/70 p-10 bg-base-300 rounded-lg shadow">
          No recent bills found. Please add initial bill data via your backend.
        </p>
      )}
    </section>
  );
};

export default RecentBillsSection;
