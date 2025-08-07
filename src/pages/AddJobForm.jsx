import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AddJobForm = () => {
  const navigate = useNavigate();

  const [jobList, setJobList] = useState([]);

  const [formData, setFormData] = useState({
    id: Date.now(),
    title: "",
    description: "",
    image: "",
    salary: "",
    location: "",
    company: "",
    type: "",
    category: "",
    deadline: "",
    status: "",
  });

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("joblist")) || [];
    setJobList(storedJobs);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJobList = [...jobList, formData];
    setJobList(newJobList);
    localStorage.setItem("joblist", JSON.stringify(newJobList));
    navigate("/admindashboard");
    setFormData({
      id: Date.now(),
      title: "",
      description: "",
      image: "",
      salary: "",
      location: "",
      company: "",
      type: "",
      category: "",
      deadline: "",
      status: "",
    });
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Job</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter job title"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Company Name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Google, Microsoft..."
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-600 mb-1">Job Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Describe the job role and responsibilities"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Salary (₹)</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Ex: 50000"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Delhi, Remote, etc."
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Job Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Fresher, Intern, etc."
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Remote, Onsite"
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Application Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="paused">Paused</option>
          </select>
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-600 mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Preview */}
        {formData.image && (
          <div className="md:col-span-2 flex items-center gap-4 mt-2">
            <img
              src={formData.image}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-md border shadow"
            />
            <button
              type="button"
              onClick={removeImage}
              className="text-red-500 hover:underline text-sm"
            >
              Remove Image
            </button>
          </div>
        )}

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition"
          >
            Submit Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJobForm;
