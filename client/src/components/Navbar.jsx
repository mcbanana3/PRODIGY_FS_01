import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md fixed w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Links */}
        <div className="text-white text-xl font-bold flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-200 transition duration-300">
            MyApp
          </Link>
          {token && (
            <Link
              to="/protected"
              className="hover:text-gray-200 transition duration-300"
            >
              Profile
            </Link>
          )}
        </div>

        {/* Navigation Actions */}
        <div>
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full font-semibold shadow-lg transition duration-300"
            >
              Logout
            </button>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="text-white font-medium hover:text-gray-200 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white font-medium hover:text-gray-200 transition duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
