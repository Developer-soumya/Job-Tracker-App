import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaUserCircle, FaHome, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router";

const navItems = [
  { id: "all", label: "All Jobs", icon: <FaHome /> },
  { id: "applied", label: "My Applications", icon: <FaBriefcase /> },
];

const Sidebar = ({ sidebarTab, setSidebarTab }) => (
  <motion.aside
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="hidden md:flex flex-col justify-between min-h-screen text-white w-64 bg-gradient-to-b from-indigo-600 to-blue-500 shadow-2xl"
  >
    <div className="p-6">
      <div className="text-4xl font-extrabold text-white mb-10 tracking-tight">
        Job Tracker
      </div>
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setSidebarTab(item.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
              sidebarTab === item.id
                ? "bg-white text-indigo-900 shadow-md"
                : "hover:bg-indigo-700 hover:shadow-lg"
            }`}
          >
            {item.icon} {item.label}
          </motion.button>
        ))}
      </nav>
    </div>
    <div className="p-6 text-sm text-indigo-200 tracking-wide">
      &copy; 2025 Job Tracker
    </div>
  </motion.aside>
);

const BottomNav = ({ sidebarTab, setSidebarTab }) => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-indigo-100 shadow-lg flex justify-around py-3 md:hidden z-40">
    {navItems.map((item) => (
      <motion.button
        key={item.id}
        onClick={() => setSidebarTab(item.id)}
        whileTap={{ scale: 0.9 }}
        className={`flex flex-col items-center text-sm font-medium ${
          sidebarTab === item.id ? "text-indigo-600" : "text-gray-600"
        }`}
      >
        {item.icon}
        {item.label.split(" ")[0]}
      </motion.button>
    ))}
  </nav>
);

const UserDashboard = () => {
  const [sidebarTab, setSidebarTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex flex-col">
      <div className="flex flex-1">
        <div className="bg-blue-800">
          <Sidebar sidebarTab={sidebarTab} setSidebarTab={setSidebarTab} />
        </div>
        <div className="flex-1 p-4 pb-16 md:pb-4">
          <nav className="flex justify-end bg-white p-3 rounded shadow">
            <div className="flex items-center gap-6">
              <motion.div
                className="relative hidden md:block w-full max-w-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 border border-indigo-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50 transition-all duration-300"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaSearch
                  size={22}
                  onClick={() => setShowSearchInput(!showSearchInput)}
                  className="text-indigo-600 cursor-pointer md:hidden"
                />
              </motion.div>
              <div className="relative">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <FaUserCircle
                    size={28}
                    className="text-indigo-600 cursor-pointer"
                    onClick={() => setShowProfile(!showProfile)}
                  />
                </motion.div>
                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-12 bg-white shadow-2xl rounded-lg overflow-hidden z-10 border border-indigo-100"
                    >
                      <button
                        onClick={() => {
                          localStorage.removeItem("Role");
                          navigate("/login");
                        }}
                        className="block w-full text-left px-6 py-3 hover:bg-indigo-50 text-sm font-medium text-gray-700 transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                        <AnimatePresence>
                            {showProfile && (
                              <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto"
                              >
                                <div className="flex justify-between items-center mb-4">
                                  <h2 className="text-xl font-semibold">Profile</h2>
                                  <FaTimes
                                    className="text-gray-500 cursor-pointer"
                                    onClick={() => setShowProfile(false)}
                                  />
                                </div>
                  
                                <div className="flex flex-col items-center text-center">
                                  {adminData.profileImage ? (
                                    <img
                                      src={adminData.profileImage}
                                      alt="Profile"
                                      className="w-24 h-24 rounded-full mb-2 object-cover"
                                    />
                                  ) : (
                                    <CgProfile className="text-6xl text-gray-400 mb-2" />
                                  )}
                                  <label className="text-sm text-blue-600 cursor-pointer">
                                    Upload PNG Only
                                    <input
                                      type="file"
                                      accept="image/png"
                                      onChange={handleImageUpload}
                                      className="hidden"
                                    />
                                  </label>
                                  <div>
                                    <p className="text-lg font-semibold mt-2 text-center">{adminData.firstName}</p>
                                    <p className="text-sm text-gray-600">{adminData.profession}</p>
                                    <p className="text-sm text-gray-600">{adminData.email}</p>
                                    <p className="text-sm text-gray-600">{adminData.phone}</p>
                                  </div>
                                </div>
                  
                                <div className="mt-6 space-y-2">
                                  <button
                                    onClick={logout}
                                    className="flex items-center justify-center gap-2 py-2 bg-red-500 text-white rounded-md w-full"
                                  >
                                    <FaSignOutAlt /> Logout
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                </AnimatePresence>
              </div>
            </div>
          </nav>

          <AnimatePresence>
            {showSearchInput && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white px-6 py-3 shadow-md md:hidden"
              >
                <div className="relative w-full">
                  <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none bg-indigo-50"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 p-8">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-gray-900 mb-8 tracking-tight"
            >
              {sidebarTab === "all" ? "💼 Available Jobs" : "📝 My Applications"}
            </motion.h2>
            {sidebarTab === "all" ? (
              filteredJobs.length === 0 ? (
                <p className="text-gray-500 text-lg font-medium">No jobs found.</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredJobs.map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-5 rounded-xl border shadow hover:shadow-md transition"
                      onClick={()=>{navigate(`/userpaneljobdetail/${job.id}`)}}
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
                <p className="text-gray-500 text-lg font-medium">You haven’t applied to any jobs yet.</p>
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
          </div>
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