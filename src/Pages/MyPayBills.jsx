import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { AuthContext } from "../AuthProvider/AuthProvider";
import Loader from "../Component/Loader";
import UpdateMyBillModal from "../Component/UpdateMyBillModal";
import DeleteConfirmationModal from "../Component/DeleteConfirmationModal";
import { generatePDF } from "../utils/pdfUtils";

const MyPayBills = () => {
  const {
    user,
    SERVER_BASE_URL,
    loading: authLoading,
  } = useContext(AuthContext);

  const [paidBills, setPaidBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedBill, setSelectedBill] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const userEmail = user?.email;

  // --- Data Fetching ---
  const fetchUserBills = async () => {
    if (!userEmail) return;
    setLoading(true);
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/my-bills/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`, // include token
        },
      });
      setPaidBills(res.data);
      const amountSum = res.data.reduce(
        (sum, bill) => sum + (bill.amount || 0),
        0
      );
      setTotalAmount(amountSum);
    } catch (error) {
      console.error("Error fetching paid bills:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Session invalid. Please log out and log in again.");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to load paid bills."
        );
      }
      setTotalAmount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail && !authLoading) {
      fetchUserBills();
    }
  }, [userEmail, authLoading]);

  // --- CRUD  ---
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${SERVER_BASE_URL}/my-bills/${id}`);
      toast.success("Bill record deleted successfully!");
      setIsDeleteModalOpen(false);
      fetchUserBills();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete bill.");
    }
  };

  // --- Download PDF Report  ---
  const downloadReport = () => {
    if (paidBills.length === 0) {
      return toast.warn("No bills to download.");
    }
    generatePDF(
      paidBills,
      user.displayName || "N/A",
      user.email || "N/A",
      totalAmount
    );
  };

  const displayLoading = loading || authLoading;

  if (displayLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-base-100 dark:bg-base-200 py-10">
      <div className="container mx-auto px-4">
        {/* Header  */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-cyan-600 p-6 rounded-xl shadow-2xl mb-8 text-white">
          <h1 className="text-3xl font-extrabold">My Paid Bills</h1>
          <div className="text-right mt-4 md:mt-0">
            <p className="text-xl font-bold">
              {" "}
              Total Bills Paid: {paidBills.length}{" "}
            </p>
            <p className="text-2xl font-extrabold">
              {" "}
              Total Amount: ৳{totalAmount.toLocaleString()}{" "}
            </p>
          </div>
        </div>

        {/* Report Download Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={downloadReport}
            className="btn bg-cyan-700 text-white hover:bg-cyan-800 shadow-lg shadow-cyan-500/30"
          >
            Download Report (PDF)
          </button>
        </div>

        {/* Table Display  */}
        <div className="overflow-x-auto bg-base-100 dark:bg-base-300 rounded-xl shadow-lg border border-base-300">
          {paidBills.length === 0 ? (
            <p className="p-10 text-center text-xl text-base-content/70">
              {" "}
              You have not paid any bills yet.{" "}
            </p>
          ) : (
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200 dark:bg-base-200/50 text-base-content/80 text-sm">
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paidBills.map((bill, index) => (
                  <tr
                    key={bill._id}
                    className="hover:bg-base-200 dark:hover:bg-base-200/50"
                  >
                    <td>{index + 1}</td>
                    <td className="font-medium text-base-content">
                      {" "}
                      {bill.username}{" "}
                    </td>
                    <td className="text-sm">{bill.email}</td>
                    <td className="font-bold text-lg text-cyan-600">
                      {" "}
                      ৳{bill.amount.toLocaleString()}{" "}
                    </td>
                    <td>{new Date(bill.date).toLocaleDateString()}</td>
                    <td className="space-x-2">
                      {/* Update Button */}
                      <button
                        onClick={() => {
                          setSelectedBill(bill);
                          setIsUpdateModalOpen(true);
                        }}
                        className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                      >
                        {" "}
                        Update{" "}
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          setSelectedBill(bill);
                          setIsDeleteModalOpen(true);
                        }}
                        className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                      >
                        {" "}
                        Delete{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* --- Modals --- */}
      {isUpdateModalOpen && selectedBill && (
        <UpdateMyBillModal
          bill={selectedBill}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={fetchUserBills}
        />
      )}
      {isDeleteModalOpen && selectedBill && (
        <DeleteConfirmationModal
          bill={selectedBill}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirmDelete={() => handleDelete(selectedBill._id)}
        />
      )}
    </div>
  );
};

export default MyPayBills;
