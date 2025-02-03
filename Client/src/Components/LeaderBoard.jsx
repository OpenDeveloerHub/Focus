import React, { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data from the backend API
    axios
      .get("http://localhost:5000/api/leaderboard/weekly")
      .then((response) => {
        // Set the leaderboard data state
        setLeaderboardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard data:", error);
      });
  }, []);

  const getTrophy = (rank) => {
    if (rank === 1) return <FaTrophy className="text-yellow-400 text-2xl" />;
    if (rank === 2) return <FaTrophy className="text-gray-400 text-2xl" />;
    if (rank === 3) return <FaTrophy className="text-orange-400 text-2xl" />;
    return null;
  };

  return (
    <div className="mt-0 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 text-gray-800 p-10">
      <motion.div
        className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center mb-6 text-purple-900">
          <FaTrophy className="inline-block text-yellow-400 mr-3" />
          Leaderboard
        </h2>

        <div className="overflow-hidden rounded-lg shadow-md">
          <table className="min-w-full table-auto bg-gray-50 rounded-lg">
            <thead>
              <tr className="bg-purple-700 text-white">
                <th className="px-6 py-3 text-left">Rank</th>
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3 text-left">Total Focus Minutes</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {leaderboardData.map((user, index) => (
                <motion.tr
                  key={user.userId}
                  className={`hover:bg-purple-100 transition-colors duration-300 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <td className="px-6 py-4 flex items-center gap-3 font-semibold text-xl">
                    {getTrophy(user.rank)}
                    {user.rank}
                  </td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4 font-bold text-purple-600">
                    {user.totalFocusMinutes.toFixed(2)} mins
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg text-white font-semibold shadow-md hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.1 }}
          >
            View More Leaders
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
