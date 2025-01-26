import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://prodigy-fs-01-aryanyalavarthi.onrender.com/api/auth/register",
        {
          username,
          email,
          password,
          role,
        }
      );
      console.log(res.data);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(
          error.response.data.message || "An error occurred during registration"
        );
      } else {
        setErrorMessage("An error occurred during registration");
      }
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-green-100 to-blue-100 overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-xl py-8 w-full max-w-md border border-gray-300"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h1>
        {errorMessage && (
          <div className="alert alert-error shadow-lg mb-4">
            <span>{errorMessage}</span>
          </div>
        )}
        <div className="form-control mb-4 px-8">
          <label className="label text-gray-700 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input w-full border border-gray-300 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent p-3"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-control mb-4 px-8">
          <label className="label text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full border border-gray-300 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent p-3"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-control mb-4 px-8">
          <label className="label text-gray-700 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full border border-gray-300 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent p-3"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-control mb-4 px-8">
          <label className="label text-gray-700 font-semibold">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input w-full border border-gray-300 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent p-3"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="px-8">
          <button
            type="submit"
            className="btn btn-primary w-full bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-blue-500 hover:to-green-500 font-semibold py-2 rounded-lg shadow-lg transition-all duration-300"
          >
            Register
          </button>
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline font-medium">
              Back to Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
