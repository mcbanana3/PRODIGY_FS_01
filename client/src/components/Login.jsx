import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/protected");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(
          error.response.data.message || "An error occurred during login"
        );
      } else {
        setErrorMessage("An error occurred during login");
      }
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-blue-100 to-purple-100 overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-xl py-8 w-full max-w-md border border-gray-300"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back!
        </h1>
        {errorMessage && (
          <div className="alert alert-error shadow-lg mb-4">
            <span>{errorMessage}</span>
          </div>
        )}
        <div className="form-control mb-4 px-8">
          <label className="label text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full border border-gray-300 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-3"
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
            className="input w-full border border-gray-300 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-3"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="px-8">
          <button
            type="submit"
            className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500 font-semibold py-2 rounded-lg shadow-lg transition-all duration-300"
          >
            Login
          </button>
          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
