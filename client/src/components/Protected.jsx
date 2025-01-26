import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Protected = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({ username: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const res = await axios.get(
          "http://localhost:5000/api/auth/protected",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessage(res.data.message);
        setUser(res.data.user);
      } catch (error) {
        console.error(error.response?.data);
        navigate("/");
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-blue-100 to-indigo-200 overflow-hidden">
      <div className="bg-white shadow-2xl rounded-2xl border border-gray-300 p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back!
        </h1>
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-lg">
            {user.username.slice(0, 1).toUpperCase()}
          </div>
        </div>
        <div className="text-center mb-4">
          <p className="text-2xl font-semibold text-gray-900">
            {user.username}
          </p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white py-3 px-6 rounded-lg w-full font-semibold shadow-lg transition duration-300"
        >
          Logout
        </button>
        {message && (
          <p className="text-gray-600 mt-6 text-center border-t border-gray-200 pt-4">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Protected;
