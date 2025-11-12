import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loader from "../Component/Loader";
import PayBillModal from "../Component/Home/PayBillModal";

const BillDetails = () => {
  const { id } = useParams();
  const { user, SERVER_BASE_URL } = useContext(AuthContext);
  const navigate = useNavigate();

  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCurrentMonth, setIsCurrentMonth] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Data Fetching ---
  useEffect(() => {
    if (!user || !id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`${SERVER_BASE_URL}/bills/${id}`)
      .then((res) => {
        const fetchedBill = res.data;
        setBill(fetchedBill);

        checkCurrentMonth(fetchedBill.date);
      })
      .catch((error) => {
        console.error("Error fetching bill details:", error);
        toast.error("Failed to load bill details.");
        navigate("/bills");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, user, SERVER_BASE_URL, navigate]);

  const checkCurrentMonth = (billDateString) => {
    if (!billDateString) return setIsCurrentMonth(false);

    const billDate = new Date(billDateString);
    const currentDate = new Date();

    const sameYear = billDate.getFullYear() === currentDate.getFullYear();
    const sameMonth = billDate.getMonth() === currentDate.getMonth();

    setIsCurrentMonth(sameYear && sameMonth);
  };

  if (loading) return <Loader />;
  if (!bill)
    return (
      <div className="text-center py-20 text-xl text-red-500">
        Bill not found.
      </div>
    );

  const formattedDate = new Date(bill.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-base-100 dark:bg-base-200 py-10 min-h-[calc(100vh-160px)]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-extrabold text-base-content mb-8 text-center border-b pb-3">
          Bill Details: {bill.title}
        </h1>

        <div className="bg-base-100 dark:bg-base-300 p-8 rounded-xl shadow-2xl border border-cyan-500/20">
          {/* Image */}
          <img
            src={
              bill.image ||
              "https://via.placeholder.com/800x400?text=Bill+Document"
            }
            alt={bill.title}
            className="w-full h-80 object-cover rounded-lg mb-8 shadow-md"
          />

          {/* Primary Info */}
          <div className="grid md:grid-cols-2 gap-4 mb-8 text-lg">
            <p className="font-semibold text-base-content">
              Category:{" "}
              <span className="text-cyan-600 font-bold">{bill.category}</span>
            </p>
            <p className="font-semibold text-base-content">
              Location:{" "}
              <span className="text-base-content/80">{bill.location}</span>
            </p>
            <p className="font-semibold text-base-content">
              Due Date:{" "}
              <span className="text-base-content/80">{formattedDate}</span>
            </p>
            <p className="font-extrabold text-2xl text-red-600">
              Amount: ৳{bill.amount.toLocaleString()}
            </p>
          </div>

          {/* Description */}
          <div className="mb-8 border-t pt-4 border-base-300 dark:border-base-content/20">
            <h3 className="text-2xl font-bold text-base-content mb-3">
              Description
            </h3>
            <p className="text-base-content/70 whitespace-pre-wrap">
              {bill.description || "No detailed description provided."}
            </p>
          </div>

          {/* Pay Bill Button and Status */}
          <div className="pt-4 border-t border-base-300 dark:border-base-content/20">
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={!isCurrentMonth}
              className={`w-full py-3 rounded-lg text-white font-bold transition duration-300 ${
                isCurrentMonth
                  ? "bg-cyan-600 hover:bg-cyan-700 shadow-lg shadow-cyan-500/30"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Pay Bill Now
            </button>

            {!isCurrentMonth && (
              <p className="text-red-500 text-center mt-2 text-sm font-semibold">
                Only current month bills can be paid. This bill is due in{" "}
                {formattedDate}.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Pay Bill Modal Component */}
      {isModalOpen && (
        <PayBillModal
          bill={bill}
          userEmail={user.email}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default BillDetails;
