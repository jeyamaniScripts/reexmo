import React, { useEffect, useState } from "react";
import { getEmployees } from "../api";
import { Link } from "react-router-dom";
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading employees...
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Employee List
      </h2>

      {employees.length === 0 ? (
        <p className="text-center text-gray-500">No employees found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {employees.map(({ _id, name, role, imageUrl }) => (
            <div
              key={_id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col items-center"
            >
              <img
                src={imageUrl}
                alt={name}
                className="w-24 h-24 object-cover rounded-full border-2 border-teal-500 mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
              <p className="text-sm text-gray-500 mb-3">{role}</p>

              <div className="flex gap-3">
                <Link
                  to={`/employee/${_id}`}
                  className="px-4 py-1.5 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
                >
                  View
                </Link>
                <Link
                  to={`/employee/${_id}`}
                  className="px-4 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
