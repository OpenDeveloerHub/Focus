import React from "react";
import { FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const users = [
    { id: 1, name: "Alice", studyTime: 10 },
    { id: 2, name: "Bob", studyTime: 15 },
    { id: 3, name: "Charlie", studyTime: 12 },
    { id: 4, name: "David", studyTime: 8 },
    { id: 5, name: "Eve", studyTime: 20 },
  ];

  const sortedUsers = [...users].sort((a, b) => b.studyTime - a.studyTime);

  const getTrophy = (rank) => {
    if (rank === 1) return <FaTrophy className="text-yellow-400 text-2xl" />;
    if (rank === 2) return <FaTrophy className="text-gray-400 text-2xl" />;
    if (rank === 3) return <FaTrophy className="text-orange-400 text-2xl" />;
    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-10">
      <motion.div 
        className="w-full max-w-5xl bg-gray-700/80 p-8 rounded-xl shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center mb-6">
          <FaTrophy className="inline-block text-yellow-400 mr-3" />
          Leaderboard
        </h2>

        <div className="overflow-hidden rounded-lg shadow-lg">
          <table className="min-w-full table-auto bg-gray-800 rounded-lg">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="px-6 py-3 text-left">Rank</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Study Time (hrs)</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {sortedUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  className={`hover:bg-gray-600/80 transition-colors duration-300 ${
                    index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <td className="px-6 py-4 flex items-center gap-3 font-semibold text-xl">
                    {getTrophy(index + 1)}
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4 font-bold text-blue-400">
                    {user.studyTime} hrs
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
