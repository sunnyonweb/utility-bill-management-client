import React, { useContext, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const PayBillModal = ({ bill, userEmail, onClose }) => {
  const { SERVER_BASE_URL } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // 🔑 State for user-editable fields
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phone: "",
    additionalInfo: "",
  });

  // Automatically generate the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // --- Submission Handler ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔑 Construct the data object for the MongoDB myBills collection
    const paymentData = {
      billId: bill._id, // Auto-filled (read-only)
      email: userEmail, // Auto-filled (read-only)
      amount: bill.amount, // Auto-filled (read-only)
      date: getCurrentDate(), // Auto-filled (read-only)

      // User input fields
      username: formData.username,
      address: formData.address,
      phone: formData.phone,
      additionalInfo: formData.additionalInfo || null,
    };

    axios
      .post(`${SERVER_BASE_URL}/my-bills`, paymentData)
      .then((res) => {
        toast.success(
          `Payment of ৳${bill.amount} confirmed for ${bill.title}.`,
          {
            position: "top-center",
          }
        );
        onClose(); // Close the modal upon success
        // Optionally, navigate the user or refresh data here
      })
      .catch((error) => {
        console.error("Payment submission error:", error);
        toast.error("Payment failed. Please check your inputs and try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    // 🔑 DaisyUI Modal Setup
    <div className="modal modal-open z-50">
      <div className="modal-box bg-base-100 dark:bg-base-300 p-8 rounded-xl shadow-2xl border border-cyan-500/30">
        <h3 className="text-3xl font-bold text-base-content border-b pb-3 mb-6 text-center">
          Confirm Bill Payment
        </h3>

        {/* Fixed Summary Information */}
        <div className="mb-6 p-4 bg-base-200 dark:bg-base-content/10 rounded-lg">
          <p className="text-xl font-bold text-cyan-600 mb-1">
            Amount Due: ৳{bill.amount.toLocaleString()}
          </p>
          <p className="text-sm text-base-content/70">Bill ID: {bill._id}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset disabled={loading}>
            {/* 1. Email (Read Only) */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold text-base-content">
                  Your Email (Read Only)
                </span>
              </div>
              <input
                type="email"
                value={userEmail}
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                readOnly
              />
            </label>

            {/* 2. Username */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold text-base-content">
                  Your Full Name
                </span>
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter Name on the Account"
                className="input input-bordered w-full focus:border-cyan-500"
                required
              />
            </label>

            {/* 3. Phone */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold text-base-content">
                  Phone Number
                </span>
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g., 017XXXXXXX"
                className="input input-bordered w-full focus:border-cyan-500"
                required
              />
            </label>

            {/* 4. Address */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold text-base-content">
                  Billing Address
                </span>
              </div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Your current address"
                className="input input-bordered w-full focus:border-cyan-500"
                required
              />
            </label>

            {/* 5. Date (Read Only) */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold text-base-content">
                  Payment Date (Today)
                </span>
              </div>
              <input
                type="text"
                value={getCurrentDate()}
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                readOnly
              />
            </label>

            {/* 6. Additional Info */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-base-content">
                  Additional Notes (Optional)
                </span>
              </div>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Any transaction notes or reference details"
                className="textarea textarea-bordered h-20 focus:border-cyan-500"
              ></textarea>
            </label>

            {/* Action Buttons */}
            <div className="modal-action mt-6 flex justify-between gap-3">
              <button
                type="button"
                className="btn btn-ghost border border-base-300 text-base-content hover:bg-base-200"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-cyan-600 text-white hover:bg-cyan-700 shadow-md shadow-cyan-500/30"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : `Pay ৳${bill.amount.toLocaleString()}`}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      {/* Click outside to close (Optional: for a better user experience) */}
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </div>
  );
};

export default PayBillModal;
