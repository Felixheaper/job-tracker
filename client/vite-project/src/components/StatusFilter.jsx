
import React from "react";

const StatusFilter = ({ currentStatus, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="status" className="text-sm font-medium text-gray-700">
        Filter:
      </label>
      <select
        id="status"
        value={currentStatus}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        {["All", "Applied", "Interview", "Offer", "Rejected"].map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </div>
  );
};

export default StatusFilter;
