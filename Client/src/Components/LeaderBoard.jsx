import React, { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../context/auth";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [auth] = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 25;
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    axios.get(`https://focus-59nh.vercel.app/api/leaderboard/weekly?page=${currentPage}&limit=${usersPerPage}`)
      .then((response) => {
        setLeaderboardData(response.data.users);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.error("Error fetching leaderboard data:", error));

    if (auth?.user?._id) {
      axios.get(`https://focus-59nh.vercel.app/leaderboard/weekly/${auth.user._id}`)
        .then((response) => setUserRank(response.data.rank))
        .catch((error) => console.error("Error fetching user rank:", error));
    }
  }, [currentPage, auth]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}${(remainingMinutes / 60).toFixed(2).slice(1)}`;
  };

  const getTrophy = (rank) => {
    if (rank === 1) return <FaTrophy className="text-yellow-400 text-xl md:text-2xl" />;
    if (rank === 2) return <FaTrophy className="text-gray-400 text-xl md:text-2xl" />;
    if (rank === 3) return <FaTrophy className="text-orange-400 text-xl md:text-2xl" />;
    return null;
  };

  return (
    <div className="mt-0 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-800 p-4 md:p-10">
      <motion.div
        className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {auth && userRank !== null ? (
          <div className="mb-4 text-center">
            <p className="text-lg md:text-xl font-semibold text-purple-700">Your Rank: {userRank}</p>
          </div>
        ) : (
          <div className="mb-4 text-center text-md md:text-lg font-medium text-red-600">Login to see your rank.</div>
        )}

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-purple-900">
          <FaTrophy className="inline-block text-yellow-400 mr-2 md:mr-3" />
          Weekly Leaderboard
        </h2>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full min-w-[320px] md:min-w-full bg-gray-50 rounded-lg">
            <thead>
              <tr className="bg-purple-700 text-white text-sm md:text-base">
                <th className="px-4 md:px-6 py-3 text-left">Rank</th>
                <th className="px-4 md:px-6 py-3 text-left">Username</th>
                <th className="px-4 md:px-6 py-3 text-left">Focus Time</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm md:text-base">
              {leaderboardData.map((user) => (
                <motion.tr
                  key={user.userId}
                  className={`hover:bg-purple-100 transition-colors duration-300 ${
                    auth?.user?._id === user.userId ? "bg-red-500 text-white font-bold" : "bg-white"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <td className="px-4 md:px-6 py-3 flex items-center gap-2 font-semibold">
                    {getTrophy(user.rank)}
                    {user.rank}
                  </td>
                  <td className="px-4 md:px-6 py-3">{user.username}</td>
                  <td className="px-4 md:px-6 py-3 font-bold">{formatTime(user.totalFocusMinutes)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-5 flex justify-center items-center gap-3 md:gap-4">
          <button
            className={`px-3 py-2 md:px-4 md:py-2 rounded-lg text-white font-semibold transition ${
              currentPage > 1 ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm md:text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-3 py-2 md:px-4 md:py-2 rounded-lg text-white font-semibold transition ${
              currentPage < totalPages ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
