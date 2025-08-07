// SearchPage.jsx
import React, { useEffect, useState } from "react";

const SearchPage = () => {
  const [jobList, setJobList] = useState([]);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("joblist")) || [];
    const apps = JSON.parse(localStorage.getItem("myApplications")) || [];
    setJobList(jobs);
    setApplications(apps);
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();

    const matchedJobs = jobList.filter((job) =>
      job.title.toLowerCase().includes(term)
    );

    const matchedApplicants = applications.filter((app) =>
      app.name.toLowerCase().includes(term)
    );

    setFilteredJobs(matchedJobs);
    setFilteredApplicants(matchedApplicants);
  }, [searchTerm, jobList, applications]);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-700 mb-4 sm:mb-6 text-center">
        Search
      </h2>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search jobs or applicant names..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <div className="mb-10">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3">
          Matching Jobs
        </h3>
        {filteredJobs.length === 0 ? (
          <p className="text-sm text-gray-500">No matching jobs found.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {filteredJobs.map((job, index) => (
              <li
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition hover:shadow-md"
              >
                <h4 className="text-indigo-600 font-semibold text-base sm:text-lg">
                  {job.title}
                </h4>
                <p className="text-sm text-gray-600">{job.company}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3">
          Matching Applicants
        </h3>
        {filteredApplicants.length === 0 ? (
          <p className="text-sm text-gray-500">No matching applicants found.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {filteredApplicants.map((app, index) => (
              <li
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition hover:shadow-md"
              >
                <h4 className="text-indigo-600 font-semibold text-base sm:text-lg">
                  {app.name}
                </h4>
                <p className="text-sm text-gray-600">{app.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
