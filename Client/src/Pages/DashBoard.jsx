import React from 'react';
import Leaderboard from '../Components/LeaderBoard';
import { useAuth } from '../context/auth'; // Import the useAuth hook

function DashBoard() {
  const [auth] = useAuth(); // Access the auth data

  const handleButtonClick = () => {
    console.log(auth); // Log the auth data to the console
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-[#522D9] p-8">
      {/* Dashboard Header */}
      <div className="mb-6 text-center">
        <h1 className="mt-8 text-4xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-700 mt-2">Here are your top leaderboard stats.</p>
      </div>

      {/* Leaderboard Component */}
      <Leaderboard />

      {/* Auth Data Button */}

    </div>
  );
}

export default DashBoard;
