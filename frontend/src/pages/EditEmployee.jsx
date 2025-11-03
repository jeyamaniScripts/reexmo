import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../api";
import bgImage from "../assets/access_bg.jpg";

const EditEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    imageUrl: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch existing employee data
  useEffect(() => {
    async function fetchEmployee() {
      try {
        const data = await getEmployeeById(id);
        setFormData({
          name: data.name || "",
          password: "",
          imageUrl: data.imageUrl || "",
          role: data.role || "",
        });
      } catch (error) {
        console.error("Error loading employee:", error);
      } finally {
        setFetching(false);
      }
    }
    fetchEmployee();
  }, [id]);

  // Handle input change
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
      await updateEmployee(id, formData);
      setSuccess(true);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error updating employee:", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen text-teal-600 text-xl font-semibold">
        Loading Employee Details...
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Section: Illustration */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <img
          src={bgImage}
          alt="Edit Employee Illustration"
          className="max-w-md w-full drop-shadow-lg rounded-lg"
        />
      </div>

      {/* Right Section: Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
            Edit Employee
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
                Password (Leave blank to keep unchanged)
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter new password if you want to update"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              {loading ? "Updating..." : "Update Employee"}
            </button>

            {/* Success Message */}
            {success && (
              <p className="text-green-600 text-center mt-3 font-medium">
                ✅ Employee updated successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
