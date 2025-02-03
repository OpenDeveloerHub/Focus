import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
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
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('User Registered:', response.data);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      setError('Error registering user: ' + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#a283ff] to-[#6868b3]">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-[#ffffff] p-8 rounded-2xl shadow-2xl w-96 backdrop-blur-lg bg-opacity-90"
      >
        <h2 className="text-3xl font-extrabold text-center text-[#6868b3] mb-6">Create Account</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {['username', 'email', 'password', 'confirmPassword'].map((field, index) => (
            <div key={index} className="relative">
              <input
                type={field.includes('password') ? 'password' : 'text'}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full px-4 py-2 border border-[#e4e4ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a283ff] text-[#6868b3] placeholder-[#cacaff]"
              />
            </div>
          ))}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-[#a283ff] to-[#6868b3] hover:from-[#6868b3] hover:to-[#a283ff] transition-all duration-300 shadow-md"
          >
            Register
          </motion.button>
        </form>
        
        <p className="text-center text-[#6868b3] mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-[#a283ff] font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
