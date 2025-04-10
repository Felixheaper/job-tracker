// JobList.jsx
import React from "react";
import JobCard from "./JobCard";
import StatusFilter from "./StatusFilter";
import { toast } from "react-toastify";
import axios from "axios";

const JobList = ({ jobs, fetchJobs, statusFilter, setStatusFilter }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}jobs/${id}`);
      toast.success("🗑️ Job deleted");
      fetchJobs();
    } catch (err) {
      console.error("Error deleting job:", err);
      toast.error("❌ Delete failed");
    }
  };

  const handleUpdate = (updatedJob) => {
    toast.success("✏️ Job updated");
    fetchJobs(); // refresh list to reflect edit
  };

  const handleStatusChange = (newStatus) => {
    setStatusFilter(newStatus);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-indigo-800">Job Applications</h2>
        <StatusFilter currentStatus={statusFilter} onChange={handleStatusChange} />
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-600 text-center">No jobs found. Add your first one!</p>
      ) : (
        jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))
      )}
    </div>
  );
};

export default JobList;
