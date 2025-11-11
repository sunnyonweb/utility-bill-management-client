import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider/AuthProvider";

const UpdateMyBillModal = ({ bill, onClose, onUpdate }) => {
  const { SERVER_BASE_URL, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // 🔑 State initialized with current bill data for auto-fill
  const [formData, setFormData] = useState({
    amount: bill.amount || "",
    address: bill.address || "",
    phone: bill.phone || "",
    // Format date to YYYY-MM-DD for input type="date" compatibility
    date: bill.date ? new Date(bill.date).toISOString().split("T")[0] : "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Include the user's email for the security check on the server (Route 7)
    const updateData = {
      ...formData,
      email: user.email,
      amount: parseFloat(formData.amount), // Ensure amount is a number
    };

    axios
      .patch(`${SERVER_BASE_URL}/my-bills/${bill._id}`, updateData)
      .then((res) => {
        toast.success(`Bill record updated successfully!`, {
          position: "top-center",
        });
        onUpdate(); // Refresh the list of paid bills on the main page
        onClose();
      })
      .catch((error) => {
        console.error("Update error:", error);
        toast.error(
          error.response?.data?.message || "Failed to update record."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="modal modal-open z-50">
      <div className="modal-box bg-base-100 dark:bg-base-300 p-8 rounded-xl shadow-2xl border border-blue-500/30">
        <h3 className="text-3xl font-bold text-base-content border-b pb-3 mb-6 text-center text-blue-600">
          Update Paid Bill
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset disabled={loading}>
            {/* 1. Amount */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold text-base-content">
                  Amount (৳)
                </span>
              </div>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="input input-bordered w-full focus:border-cyan-500"
                required
              />
            </label>

            {/* 2. Phone */}
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
                className="input input-bordered w-full focus:border-cyan-500"
                required
              />
            </label>

            {/* 3. Address */}
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
                className="input input-bordered w-full focus:border-cyan-500"
                required
              />
            </label>

            {/* 4. Date */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold text-base-content">
                  Payment Date
                </span>
              </div>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="input input-bordered w-full focus:border-cyan-500"
                required
              />
            </label>

            {/* Action Buttons */}
            <div className="modal-action mt-6 flex justify-end gap-3">
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
                className="btn bg-blue-500 text-white hover:bg-blue-600 shadow-md shadow-blue-500/30"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </div>
  );
};

export default UpdateMyBillModal;
