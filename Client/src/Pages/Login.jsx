import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Logged In", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1e3a8a] to-[#9333ea] relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute w-72 h-72 bg-purple-400 rounded-full opacity-20 blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl bottom-10 right-10 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl w-96 border border-white/20"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6 animate-fadeIn">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="animate-slideUp">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full bg-transparent text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-200"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full bg-transparent text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-200"
              placeholder="Enter your password"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
          >
            Login
          </motion.button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-200">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-300 hover:underline transition-all"
            >
              Register here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
