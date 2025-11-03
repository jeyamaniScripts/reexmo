import React, { useState } from "react";
import { addEmployee } from "../api";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/access_bg.jpg";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    imageUrl: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await addEmployee(formData);
      setSuccess(true);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error adding employee:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Left Section: Image */}
      <div className="md:w-1/2 flex items-center justify-center bg-gradient-to-br from-teal-100 to-white">
        <img
          src={bgImage}
          alt="Add Employee Illustration"
          className="w-4/5 max-w-lg object-cover rounded-2xl shadow-2xl"
        />
      </div>

      {/* Right Section: Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
            Add New Employee
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter employee name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter employee password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                placeholder="https://example.com/photo.jpg"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Role
              </label>
              <input
                type="text"
                name="role"
                placeholder="e.g. Frontend Developer"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white rounded-md font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              {loading ? "Adding..." : "Add Employee"}
            </button>

            {/* Success message */}
            {success && (
              <p className="text-green-600 text-center mt-3 font-medium">
                ✅ Employee added successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
