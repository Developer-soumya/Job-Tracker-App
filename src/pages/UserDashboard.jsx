import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaUserCircle, FaHome, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router";

const navItems = [
  { id: "all", label: "All Jobs", icon: <FaHome /> },
  { id: "applied", label: "My Applications", icon: <FaBriefcase /> },
];

const Sidebar = ({ sidebarTab, setSidebarTab }) => (
  <aside className="w-64 bg-blue-800 shadow-lg p-6 hidden md:flex flex-col justify-between">
    <div>
      <div className="text-3xl font-extrabold text-indigo-600 mb-8">JobHunt</div>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSidebarTab(item.id)}
            className={`text-left px-4 py-2 rounded-lg font-medium ${
              sidebarTab === item.id ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
    <div className="text-sm text-gray-500">&copy; 2025 JobHunt</div>
  </aside>
);

const BottomNav = ({ sidebarTab, setSidebarTab }) => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 md:hidden z-40">
    {navItems.map((item) => (
      <button
        key={item.id}
        onClick={() => setSidebarTab(item.id)}
        className={`flex flex-col items-center text-sm ${
          sidebarTab === item.id ? "text-indigo-600" : "text-gray-500"
        }`}
      >
        {item.icon}
        {item.label.split(" ")[0]}
      </button>
    ))}
  </nav>
);

const UserDashboard = () => {
  const [jobList, setJobList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [sidebarTab, setSidebarTab] = useState("all");
  const [resumeFile, setResumeFile] = useState(null);
  const [editingApplication, setEditingApplication] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("joblist")) || [];
    setJobList(storedJobs);
    const storedApplications = JSON.parse(localStorage.getItem("myApplications")) || [];
    setAppliedJobs(storedApplications);
  }, []);

  const filteredJobs = jobList.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowForm(true);
    setResumeFile(null);
    setEditingApplication(null);
  };

  const handleEditClick = (index) => {
    const app = appliedJobs[index];
    setSelectedJob({ title: app.title, company: app.company, id: app.jobId });
    setEditingApplication(index);
    setResumeFile(app.resume);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedJob(null);
    setResumeFile(null);
    setEditingApplication(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeFile({ name: file.name, data: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const applicationData = {
      jobId: selectedJob?.id || selectedJob?.title,
      title: selectedJob?.title,
      company: selectedJob?.company,
      name: form.fullname.value,
      email: form.email.value,
      phone: form.phone.value,
      age: form.age.value,
      skills: form.skills.value,
      about: form.about.value,
      experience: form.experience.value,
      resume: resumeFile ? { name: resumeFile.name, data: resumeFile.data } : null,
      status: "Pending",
    };

    let updatedApplications;
    if (editingApplication !== null) {
      updatedApplications = [...appliedJobs];
      updatedApplications[editingApplication] = applicationData;
    } else {
      updatedApplications = [...appliedJobs, applicationData];
    }

    setAppliedJobs(updatedApplications);
    localStorage.setItem("myApplications", JSON.stringify(updatedApplications));
    closeForm();
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700 border border-green-300";
      case "Rejected":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-white font-sans">
      <nav className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-indigo-600 md:text-2xl">JobHunt</div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-full max-w-md">
            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <FaSearch
              size={20}
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="text-gray-500 cursor-pointer md:hidden"
            />
            <div className="relative">
              <FaUserCircle
                size={24}
                className="text-indigo-600 cursor-pointer"
                onClick={() => setShowProfile(!showProfile)}
              />
              {showProfile && (
                <div className="absolute right-0 top-10 bg-white shadow-xl rounded-md overflow-hidden z-10">
                  <button
                    onClick={() => {
                      localStorage.removeItem("Role");
                      navigate("/login");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showSearchInput && (
        <div className="bg-white px-4 py-2 shadow-md md:hidden">
          <div className="relative w-full">
            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none"
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex md:flex-row">
        <Sidebar sidebarTab={sidebarTab} setSidebarTab={setSidebarTab} />
        <div className="flex-1">
          <section className="p-6 pb-16 md:pb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {sidebarTab === "all" ? "💼 Available Jobs" : "📝 My Applications"}
            </h2>

            {sidebarTab === "all" ? (
              filteredJobs.length === 0 ? (
                <p className="text-gray-500">No jobs found.</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredJobs.map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-5 rounded-xl border shadow hover:shadow-md transition"
                    >
                      {job.image && <img src={job.image} alt="Company" className="w-full h-40 object-cover rounded-md mb-4" />}
                      <h3 className="text-xl font-semibold text-indigo-700">{job.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 mb-2">
                        <strong>Company:</strong> {job.company}
                      </p>
                      <p className="text-sm text-gray-500 line-clamp-3">{job.description}</p>
                      <button
                        onClick={() => handleApplyClick(job)}
                        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                      >
                        Apply Now
                      </button>
                    </motion.div>
                  ))}
                </div>
              )
            ) : (
              appliedJobs.length === 0 ? (
                <p className="text-gray-500">You haven’t applied to any jobs yet.</p>
              ) : (
                <ul className="space-y-6">
                  {appliedJobs.map((app, idx) => (
                    <li key={idx} className="bg-white border shadow p-6 rounded-lg relative">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div className="text-left space-y-1">
                          <h4 className="text-lg font-bold text-indigo-700">{app.title}</h4>
                          <p className="text-sm text-gray-600"><strong>Company:</strong> {app.company}</p>
                          <p className="text-sm text-gray-600"><strong>Name:</strong> {app.name}</p>
                          <p className="text-sm text-gray-600"><strong>Email:</strong> {app.email}</p>
                          <p className="text-sm text-gray-600"><strong>Phone:</strong> {app.phone}</p>
                          {app.resume && <p className="text-sm text-gray-600"><strong>Resume:</strong> {app.resume.name}</p>}
                        </div>
                        <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end">
                          <span className={`mb-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(app.status)}`}>
                            {app.status}
                          </span>
                          {app.status === "Pending" && (
                            <button
                              onClick={() => handleEditClick(idx)}
                              className="mt-1 bg-blue-600 px-5 py-2 text-white text-sm rounded hover:bg-blue-700 transition w-full sm:w-auto"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )
            )}
          </section>
        </div>
      </div>

      <BottomNav sidebarTab={sidebarTab} setSidebarTab={setSidebarTab} />

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-xl relative shadow-xl"
            >
              <button
                onClick={closeForm}
                className="absolute top-2 right-4 text-gray-500 hover:text-black text-2xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                {editingApplication !== null ? `Edit Application for ${selectedJob?.title}` : `Apply for ${selectedJob?.title}`}
              </h2>
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <input
                  name="fullname"
                  type="text"
                  placeholder="Full Name"
                  required
                  defaultValue={editingApplication !== null ? appliedJobs[editingApplication].name : ""}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  name="age"
                  type="number"
                  placeholder="Age"
                  required
                  defaultValue={editingApplication !== null ? appliedJobs[editingApplication].age : ""}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  defaultValue={editingApplication !== null ? appliedJobs[editingApplication].email : ""}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                  defaultValue={editingApplication !== null ? appliedJobs[editingApplication].phone : ""}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  name="skills"
                  type="text"
                  placeholder="Skills"
                  defaultValue={editingApplication !== null ? appliedJobs[editingApplication].skills : ""}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <textarea
                  name="about"
                  rows="3"
                  placeholder="Tell us about yourself..."
                  defaultValue={editingApplication !== null ? appliedJobs[editingApplication].about : ""}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  name="experience"
                  type="text"
                  placeholder="Experience (e.g., 2 years)"
                  defaultValue={editingApplication !== null ? appliedJobs[editingApplication].experience : ""}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Resume {editingApplication !== null && appliedJobs[editingApplication].resume ? `(${appliedJobs[editingApplication].resume.name})` : ""}
                  </label>
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                  {editingApplication !== null ? "Update Application" : "Submit Application"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDashboard;