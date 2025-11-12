import React, { useState } from "react";

const DeleteConfirmationModal = ({ bill, onClose, onConfirmDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);

    onConfirmDelete();
  };

  return (
    <div className="modal modal-open z-50">
      <div className="modal-box bg-base-100 dark:bg-base-300 p-8 rounded-xl shadow-2xl border border-red-500/30">
        <h3 className="text-3xl font-bold text-red-600 border-b pb-3 mb-6">
          Confirm Deletion
        </h3>

        <p className="text-lg text-base-content mb-4">
          Are you sure you want to permanently delete the following paid bill
          record?
        </p>

        <div className="p-4 bg-base-200 dark:bg-base-content/10 rounded-lg mb-6">
          <p className="font-semibold text-base-content">
            Bill ID: <span className="text-red-500 break-all">{bill._id}</span>
          </p>
          <p className="font-semibold text-base-content mt-1">
            Amount: ৳{bill.amount.toLocaleString()}
          </p>
        </div>

        <p className="text-sm text-red-500 mb-6">
          This action cannot be undone.
        </p>

        {/*  Buttons */}
        <div className="modal-action flex justify-end gap-3">
          <button
            type="button"
            className="btn btn-ghost border border-base-300 text-base-content hover:bg-base-200"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-500/30"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Permanently"}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </div>
  );
};

export default DeleteConfirmationModal;
