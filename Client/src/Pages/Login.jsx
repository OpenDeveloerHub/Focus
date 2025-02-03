import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/auth'; // Import useAuth

function Login() {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [auth, setAuth] = useAuth(); // Get the auth context
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make sure to send both username/email and password to the backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.usernameOrEmail,  // Use email in the backend API
        password: formData.password
      });

      console.log('User Logged In:', response.data);

      // Save token to localStorage
      localStorage.setItem('authToken', response.data.token);

      // Update the auth context with the user data and token
      setAuth({
        user: response.data.user,  // Assuming response contains user data
        token: response.data.token, // Save the token in context
      });
      console.log(auth);
      console.log("djd");

      navigate('/dashboard'); // Redirect to the dashboard after successful login
    } catch (err) {
      setError('Error logging in: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96 backdrop-blur-lg bg-opacity-90"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {['usernameOrEmail', 'password'].map((field, index) => (
            <div key={index} className="relative">
              <input
                type={field === 'password' ? 'password' : 'text'}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                placeholder={field === 'usernameOrEmail' ? 'Username or Email' : 'Password'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-500"
              />
            </div>
          ))}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-md"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
