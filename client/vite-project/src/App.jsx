// App.jsx
import React, { useEffect, useState } from "react";
import AddJobForm from "./components/AddJobForm";
import JobList from "./components/JobList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RocketIcon } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchJobs = async (filter = statusFilter) => {
    try {
      const query = filter !== "All" ? `?status=${filter}` : "";
      const url = `${import.meta.env.VITE_API_URL}jobs${query}`;
      const { data } = await axios.get(url);
      setJobs(data);
    } catch (err) {
      console.error("Error loading jobs", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [statusFilter]);

  const addJobToList = (job) => {
    setJobs((prev) => [job, ...prev]);
  };

  return (
    <div className="min-h-screen px-4 py-8 transition-all duration-300 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md py-4 px-6 rounded-b-xl mb-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <h1 className="text-4xl font-extrabold text-center text-amber-800 flex items-center gap-2">
            <RocketIcon size={36} /> Student Job Tracker
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-white shadow-lg rounded-xl p-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AddJobForm fetchJobs={fetchJobs} addJobToList={addJobToList} />
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-xl p-6 overflow-y-auto max-h-[80vh]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="p-2 md:p-4">
            <JobList
              jobs={jobs}
              fetchJobs={fetchJobs}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </div>
        </motion.div>
      </main>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}