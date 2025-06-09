// components/Notification.js
import React from "react";

const Notification = ({ message, type = "success", onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded-md shadow-lg text-white z-50 transition-all duration-300 ${
        type === "error" ? "bg-red-600" : "bg-green-600"
      }`}
    >
      <div className="flex justify-between items-center gap-4">
        <span>{message}</span>
        <button onClick={onClose} className="text-xl font-bold">
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;
