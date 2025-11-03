import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEmployeeById } from "../api";

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Loading employee details...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-10 text-gray-500">
        Employee not found.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-blue-200 shadow-lg rounded-xl p-6 text-center">
      <img
        src={employee.imageUrl}
        alt={employee.name}
        className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-teal-500 mb-4"
      />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {employee.name}
      </h2>
      <p className="text-gray-500 mb-4">{employee.role}</p>

      <div className="flex justify-center gap-4">
        <Link
          to={`/edit/${employee._id}`}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md"
        >
          Edit
        </Link>
        <Link
          to={`/delete/${employee._id}`}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Delete
        </Link>
      </div>

      <div className="mt-6">
        <Link
          to="/"
          className="inline-block text-teal-600 hover:text-teal-700 text-sm"
        >
          ← Back to Employee List
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDetails;
