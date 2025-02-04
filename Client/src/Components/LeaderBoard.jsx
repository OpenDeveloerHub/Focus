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
  console.log(auth?.user?._id);

  useEffect(() => {
    axios
      .get(`https://focus-59nh.vercel.app/api/leaderboard/weekly?page=${currentPage}&limit=${usersPerPage}`)
      .then((response) => {
        setLeaderboardData(response.data.users);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.error("Error fetching leaderboard data:", error));

    if (auth?.user?._id) {
      axios
        .get(`https://focus-l.vercel.app/api/leaderboard/weekly/${auth.user._id}`)
        .then((response) => setUserRank(response.data.rank))
        .catch((error) => console.error("Error fetching user rank:", error));

        // console.log(data);
        // console.log("data");
    }
  }, [currentPage, auth]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}${(remainingMinutes / 60).toFixed(2).slice(1)}`;
  };

  const getTrophy = (rank) => {
    if (rank === 1) return <FaTrophy className="text-yellow-400 text-2xl" />;
    if (rank === 2) return <FaTrophy className="text-gray-400 text-2xl" />;
    if (rank === 3) return <FaTrophy className="text-orange-400 text-2xl" />;
    return null;
  };

  return (
    <div className="mt-0 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 text-gray-800 p-10">
      <motion.div
        className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {auth && userRank !== null ? (
          <div className="mb-6 text-center">
            <p className="text-xl font-semibold text-purple-700">Your Rank: {userRank}</p>
          </div>
        ) : (
          <div className="mb-6 text-center text-lg font-medium text-red-600">Login to see your rank.</div>
        )}

        <h2 className="text-4xl font-bold text-center mb-6 text-purple-900">
          <FaTrophy className="inline-block text-yellow-400 mr-3" />
          Weekly Leaderboard
        </h2>

        <div className="overflow-hidden rounded-lg shadow-md">
          <table className="min-w-full table-auto bg-gray-50 rounded-lg">
            <thead>
              <tr className="bg-purple-700 text-white">
                <th className="px-6 py-3 text-left">Rank</th>
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3 text-left">Total Focus Time</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {leaderboardData.map((user) => (
                <motion.tr
                  key={user.userId}
                  className={`hover:bg-purple-100 transition-colors duration-300 ${
                    auth?.user?._id === user.userId ? "bg-red-500 text-white font-bold" : "bg-white"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <td className="px-6 py-4 flex items-center gap-3 font-semibold text-xl">
                    {getTrophy(user.rank)}
                    {user.rank}
                  </td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4 font-bold">{formatTime(user.totalFocusMinutes)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
              currentPage > 1 ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>
          <button
            className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
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
