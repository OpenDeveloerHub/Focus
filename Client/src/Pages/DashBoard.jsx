import React from 'react';
import Leaderboard from '../Components/LeaderBoard';
import { useAuth } from '../context/auth'; // Import the useAuth hook

function DashBoard() {
  const [auth] = useAuth(); // Access the auth data

  const handleButtonClick = () => {
    console.log(auth); // Log the auth data to the console
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 p-8">
      {/* Dashboard Header */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">Here are your top leaderboard stats.</p>
      </div>

      {/* Leaderboard Component */}
      <Leaderboard />

      {/* Auth Data Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleButtonClick}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Log Auth Data
        </button>
      </div>
    </div>
  );
}

export default DashBoard;
