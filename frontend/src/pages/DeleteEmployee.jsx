import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById, deleteEmployee } from "../api";

const DeleteEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${employee.name}"?`
    );
    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);
      alert("Employee deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!employee) return <p className="text-center mt-10">Employee not found</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <img
          src={employee.imageUrl}
          alt={employee.name}
          className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {employee.name}
        </h2>
        <p className="text-gray-600 mb-6">Role: {employee.role}</p>

        <p className="text-red-500 mb-6 font-medium">
          Are you sure you want to delete this employee?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployee;
