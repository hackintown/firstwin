import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold">404</h1>
        <p className="text-2xl md:text-3xl font-light mt-4">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="mt-2 text-lg text-gray-300">
          It might have been moved or deleted.
        </p>
        <div className="mt-6">
          <Link
            to="/register"
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-gray-200 transition"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
