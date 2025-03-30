import { useState } from "react";

const DeleteEventPopup = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#DBDBDB] p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-[#A08963]">
        <h2 className="text-2xl font-bold text-[#706D54]">Confirm Deletion</h2>
        <p className="text-[#4A403A] mt-3">Are you sure you want to delete this event? This action cannot be undone.</p>
        <div className="flex justify-between mt-6 space-x-4">
          <button
            onClick={onClose}
            className="w-1/2 px-4 py-2 bg-[#C9B194] text-[#4A403A] rounded-lg hover:bg-[#A08963] transition font-semibold shadow-md"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="w-1/2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold shadow-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventPopup;