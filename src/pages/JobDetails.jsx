import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router"; // ✅ use `react-router-dom` instead of `react-router`

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const jobList = JSON.parse(localStorage.getItem("joblist")) || [];
    const selectedJob = jobList.find((job) => String(job.id) === id);
    setJob(selectedJob);
  }, [id]);

  if (!job) return <div className="p-6 text-center text-gray-600">Loading or job not found...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={job.image}
            alt="Company"
            className="w-48 h-48 object-cover rounded-xl border shadow-md"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-indigo-700 mb-2">{job.title}</h1>
            <p className="text-gray-600 text-sm mb-2">
              <span className="font-medium text-gray-800">Company:</span> {job.company}
            </p>
            <p className="text-gray-600 text-sm mb-2">
              <span className="font-medium text-gray-800">Location:</span> {job.location}
            </p>
            <p className="text-gray-600 text-sm mb-2">
              <span className="font-medium text-gray-800">Type:</span> {job.type}
            </p>
            <p className="text-gray-600 text-sm mb-2">
              <span className="font-medium text-gray-800">Category:</span> {job.category}
            </p>
            <p className="text-gray-600 text-sm mb-2">
              <span className="font-medium text-gray-800">Salary:</span> ₹{job.salary}
            </p>
            <p className="text-gray-600 text-sm mb-2">
              <span className="font-medium text-gray-800">Deadline:</span> {job.deadline}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-medium text-gray-800">Status:</span>{" "}
              <span
                className={`inline-block px-2 py-1 rounded-md text-xs font-semibold ${
                  job.status === "open"
                    ? "bg-green-100 text-green-700"
                    : job.status === "closed"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {job.status}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Job Description</h2>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>

        <div className="mt-8 text-right">
          <Link
            to="/admindashboard"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md text-sm font-medium transition duration-200"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
