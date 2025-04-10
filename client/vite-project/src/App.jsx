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

  // 🔁 Fetch all jobs on first render
  useEffect(() => {
    fetchJobs();
  }, []);

  // 🔁 Refetch when status filter changes
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
