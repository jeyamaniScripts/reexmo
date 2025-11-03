import React from "react";
import { useNavigate } from "react-router-dom";
import  NotFound  from "../assets/404.svg";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      {/* 404 SVG */}
      <div className="max-w-md w-full mb-6">
        <img
          src={NotFound}
          alt="404 Not Found"
          className="w-full drop-shadow-lg animate-bounce-slow"
        />
      </div>

      {/* Text */}
      <h1 className="text-5xl font-bold text-teal-600 mb-3">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mb-6 max-w-sm">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-teal-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-teal-600 transition duration-200 shadow-md"
      >
        ⬅ Back to Home
      </button>
    </div>
  );
};

export default PageNotFound;
