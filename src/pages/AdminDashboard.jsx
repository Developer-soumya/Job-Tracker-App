import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaEnvelope,
  FaBell,
  FaSuitcase,
  FaClipboardList,
  FaChartLine,
  FaUsers,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import AddJobForm from "./AddJobForm";
import { Link, useNavigate } from "react-router";
import Applications from "./Applications";
import SearchPage from "./SearchPage";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <FaClipboardList /> },
  { id: "search", label: "Search Job", icon: <FaSuitcase /> },
  { id: "applications", label: "Applications", icon: <FaUsers /> },
  { id: "addjobs", label: "Add Jobs", icon: <FaChartLine /> },
];

const Sidebar = ({ active, setActive }) => (
  <aside className="w-60 bg-gradient-to-b from-indigo-600 to-blue-500 text-white p-6 space-y-8 hidden md:block">
    <div className="text-3xl font-bold tracking-wider">Job Tracker</div>
    <ul className="space-y-2 relative">
      {navItems.map((item) => (
        <li key={item.id} className="relative">
          {active === item.id && (
            <motion.div
              layoutId="active-sidebar"
              className="absolute left-0 top-0 w-full h-full bg-white/20 rounded-lg z-0"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <button
            onClick={() => setActive(item.id)}
            className={`relative z-10 flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left ${active === item.id ? "text-white" : "text-gray-300 hover:text-white"
              }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        </li>
      ))}
    </ul>
  </aside>
);

const BottomNav = ({ active, setActive }) => (
  <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-4 flex justify-around items-center md:hidden shadow-lg z-50">
    {navItems.map((item) => (
      <button
        key={item.id}
        onClick={() => setActive(item.id)}
        className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg ${active === item.id ? "bg-white/20" : "hover:bg-white/10"
          }`}
      >
        <span className="text-xl">{item.icon}</span>
        <span className="text-xs">{item.label}</span>
      </button>
    ))}
  </nav>
);

const AdminDashboard = () => {
  const [active, setActive] = useState("dashboard");
  const [jobList, setJobList] = useState([]);
  const [applicationCount, setApplicationCount] = useState(0);
  const [interviewScheduledCount, setInterviewScheduledCount] = useState(0);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [adminData, setAdminData] = useState(JSON.parse(localStorage.getItem("loginAdmin")));
  const navigate = useNavigate();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("joblist")) || [];
    const storedApplications = JSON.parse(localStorage.getItem("myApplications")) || [];
    setApplicationCount(storedApplications.length);
    const accepted = storedApplications.filter((app) => app.status === "Accepted");
    setInterviewScheduledCount(accepted.length);
    setJobList(storedJobs);
    const acceptedUnreadMgs = storedApplications.filter((app) => app.status === "Pending");
    setUnreadMessageCount(acceptedUnreadMgs.length);

    const storedUser = JSON.parse(localStorage.getItem("loginAdmin"));
    if (storedUser) setAdminData(storedUser);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = { ...adminData, profileImage: reader.result };
        setAdminData(updated);
        localStorage.setItem("loginAdmin", JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Only PNG files are allowed.");
    }
  };

  const renderMainContent = () => {
    switch (active) {
      case "addjobs":
        return <AddJobForm />;
      case "search":
        return <SearchPage />;
      case "applications":
        return <Applications />;
      case "dashboard":
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-purple-500 text-white rounded-xl shadow-md">
                <div className="text-sm">Interviews Scheduled</div>
                <div className="text-2xl font-bold mt-1">{interviewScheduledCount}</div>
              </div>
              <div className="p-4 bg-blue-500 text-white rounded-xl shadow-md">
                <div className="text-sm">Applications</div>
                <div className="text-2xl font-bold mt-1">{applicationCount}</div>
              </div>
              <div className="p-4 bg-lime-500 text-white rounded-xl shadow-md">
                <div className="text-sm">Unread Messages</div>
                <div className="text-2xl font-bold mt-1">{unreadMessageCount}</div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-indigo-300 to-blue-200 text-blue-900 rounded-xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between"
            >
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Welcome to the Admin Dashboard</h2>
                <p className="text-sm">Track job postings and manage applications efficiently.</p>
              </div>
              <img
                src="https://i.fbcd.co/products/original/logo-05-dce76d74dd7a31eec166ff95302dc57f82676f09d81555fbf108b90c403909d0.jpg"
                alt="dashboard"
                className="h-32 w-40 md:h-40 mt-4 md:mt-0 rounded-full"
              />
            </motion.div>

            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-lg font-semibold mb-4">All Jobs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {jobList.map((job, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white shadow">
                    <img
                      src={job.image}
                      alt="Company"
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <h4 className="text-indigo-700 font-semibold mb-1">{job.title}</h4>
                    <p className="text-sm text-gray-600">
                      <strong>Company:</strong> {job.company}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-3">{job.description}</p>
                    <div className="text-right">
                      <Link to={`/jobdetail/${job.id}`} className="text-indigo-500 text-sm hover:underline">
                        Read more →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  const logout = () => {
    const confirmed = confirm("Do you want to logout")
    if (confirmed) {
      localStorage.removeItem("Role");
      navigate("/login");
    }else{
      return;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar active={active} setActive={setActive} />
      <main className="flex-1 p-4 pb-16 md:pb-4">
        <div className="flex justify-between items-center bg-white p-3 rounded shadow">
          <h1 className="text-xl font-semibold capitalize">{active}</h1>
          <div className="flex items-center gap-4">
            <FaSearch
              className="text-gray-500 text-xl cursor-pointer"
              onClick={() => setActive("search")}
            />
            <div className="relative cursor-pointer" onClick={() => setActive("applications")}>
              <FaBell className="text-gray-500 text-xl" />
              {applicationCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {applicationCount}
                </span>
              )}
            </div>
            <FaEnvelope className="text-gray-500 text-xl cursor-pointer" />
            {adminData.profileImage ? (
              <img
                src={adminData.profileImage}
                onClick={() => setShowProfile(true)}
                alt="Profile"
                className="w-8 h-8 rounded-full cursor-pointer object-cover"
              />
            ) : (
              <CgProfile
                className="text-3xl text-blue-700 cursor-pointer"
                onClick={() => setShowProfile(true)}
              />
            )}
          </div>
        </div>

        <div className="mt-4">{renderMainContent()}</div>

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
      </main>
      <BottomNav active={active} setActive={setActive} />
    </div>
  );
};

export default AdminDashboard;