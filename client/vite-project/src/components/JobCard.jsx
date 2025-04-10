// JobCard.jsx
import React, { useState } from "react";
import { Trash2Icon, PencilIcon } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const JobCard = ({ job, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    role: job.role,
    company: job.company,
    status: job.status,
    link: job.link,
    appliedDate: job.appliedDate.split("T")[0],
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}jobs/${job._id}`,
        form
      );
      toast.success("✏️ Job updated");
      onUpdate(data);
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("❌ Failed to update job");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all border border-gray-200">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            placeholder="Role"
          />
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            placeholder="Company"
          />
          <input
            type="date"
            name="appliedDate"
            value={form.appliedDate}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="link"
            value={form.link}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            placeholder="Link"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          >
            {["Applied", "Interview", "Offer", "Rejected"].map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-600 text-gray-600 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-indigo-700">
              {job.role} <span className="text-sm text-gray-600 font-medium">@ {job.company}</span>
            </h3>
            <p className="text-sm text-gray-600">Status: <span className="font-semibold">{job.status}</span></p>
            <p className="text-xs text-gray-500">Applied on: {new Date(job.appliedDate).toLocaleDateString()}</p>
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm underline"
            >
              View Application ↗
            </a>
          </div>

          <div className="flex gap-3 mt-3 sm:mt-0">
            <button
              onClick={() => onDelete(job._id)}
              className="text-red-500 hover:text-red-700 transition"
              title="Delete"
            >
              <Trash2Icon size={18} />
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700 transition"
              title="Edit"
            >
              <PencilIcon size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
