import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo / Title */}
          <h1 className="text-2xl font-bold text-teal-600">
            Employee Dashboard
          </h1>

          {/* Navigation */}
          <nav className="flex gap-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md font-medium ${
                location.pathname === "/"
                  ? "bg-teal-500 text-white"
                  : "text-gray-700 hover:text-teal-500"
              }`}
            >
              All Employees
            </Link>

            <Link
              to="/add"
              className={`px-4 py-2 rounded-md font-medium ${
                location.pathname === "/add"
                  ? "bg-teal-500 text-white"
                  : "text-gray-700 hover:text-teal-500"
              }`}
            >
              Add Employee
            </Link>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Employee Management by Jeyamani 🚀
      </footer>
    </div>
  );
};

export default AppLayout;
