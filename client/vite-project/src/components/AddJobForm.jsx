// AddJobForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AddJobForm = ({ fetchJobs, addJobToList }) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("Applied");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = { company, role, appliedDate, link, status };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}jobs`,
        jobData
      );
      toast.success("✅ Job added successfully!");
      addJobToList(data); // ✅ add job instantly to UI
      setCompany("");
      setRole("");
      setAppliedDate("");
      setLink("");
      setStatus("Applied");
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      toast.error("❌ Failed to add job");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-xl p-8 bg-white border border-gray-200 shadow-xl rounded-xl space-y-6 mx-auto"
    >
      <h2 className="text-3xl font-bold text-center text-orange-400">
        🚀 Add New Job
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="date"
          value={appliedDate}
          onChange={(e) => setAppliedDate(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="url"
          placeholder="Job Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <div className="pt-6 space-y-3">
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-black font-bold py-3 rounded-md shadow-lg transition duration-300"
          >
            Submit Job
          </button>

          <p className="text-center text-lg italic font-semibold tracking-wide text-indigo-600">
            Welcome to the hustle world ✨
          </p>
        </div>
      </div>
    </motion.form>
  );
};

export default AddJobForm;
