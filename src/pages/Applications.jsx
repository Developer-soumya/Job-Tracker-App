import React, { useEffect, useState } from "react";

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const storedApplications = JSON.parse(localStorage.getItem("myApplications")) || [];
    setApplications(storedApplications);
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updatedApplications = [...applications];
    updatedApplications[index].status = newStatus;
    setApplications(updatedApplications);
    localStorage.setItem("myApplications", JSON.stringify(updatedApplications));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700 border-green-300";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-r from-indigo-50 to-blue-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-6 sm:mb-8 text-center">
        📄 All Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500 text-base sm:text-lg">
          No applications found.
        </p>
      ) : (
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-1 md:grid-cols-2">
          {applications.map((app, index) => (
            <div
              key={index}
              className="relative border border-gray-200 rounded-xl p-4 sm:p-6 shadow-md bg-white hover:shadow-xl transition-all duration-300"
            >
              {/* Status Selector - Mobile: static | Tablet/Desktop: absolute */}
              <div className="mb-4 md:mb-0 md:absolute md:top-4 md:right-4 text-xs sm:text-sm">
                <label className="font-medium text-gray-700 mr-2">Status:</label>
                <select
                  value={app.status || "Pending"}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                  className={`px-3 py-1 rounded-md border text-xs sm:text-sm font-medium shadow-sm focus:outline-none ${getStatusStyle(app.status)}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {/* Job Title & Company */}
              <div className="mb-4">
                <h4 className="text-lg sm:text-xl font-bold text-indigo-700">{app.title}</h4>
                <p className="text-sm text-gray-500 italic">{app.company}</p>
              </div>

              {/* Applicant Info */}
              <div className="space-y-1 text-sm sm:text-base text-gray-700">
                <p><strong>👤 Applicant:</strong> {app.name}</p>
                <p><strong>📧 Email:</strong> {app.email}</p>
                <p><strong>📞 Phone:</strong> {app.phone}</p>
                <p><strong>🎂 Age:</strong> {app.age}</p>
                <p><strong>💼 Experience:</strong> {app.experience || "N/A"}</p>
                <p><strong>🛠️ Skills:</strong> {app.skills || "N/A"}</p>
                <p><strong>📝 About:</strong> {app.about || "N/A"}</p>
                {app.resume && (
                  <p><strong>📎 Resume:</strong> {app.resume.name}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
