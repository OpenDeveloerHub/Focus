import React, { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../context/auth"; // Import the useAuth hook

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [auth, setAuth] = useAuth(); // Use the auth from the context
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 25;
  const [focusTime, setFocusTime] = useState(0); // State to store focus time input
  const [userRank, setUserRank] = useState(null); // To store the rank of the logged-in user

  useEffect(() => {
    // Fetch leaderboard data with pagination
    axios
      .get(`http://localhost:5000/api/leaderboard/weekly?page=${currentPage}&limit=${usersPerPage}`)
      .then((response) => {
        setLeaderboardData(response.data.users);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.error("Error fetching leaderboard data:", error));

    // Fetch the logged-in user's rank using their userId from the auth context
    if (auth && auth.userId) {
      axios
        .get(`http://localhost:5000/api/leaderboard/user-rank/${auth.userId}`)
        .then((response) => {
          setUserRank(response.data.rank); // Set the user's rank from the response
        })
        .catch((error) => console.error("Error fetching user rank:", error));
    }
  }, [currentPage, auth]);

  const updateFocusTime = () => {
    if (auth && focusTime > 0) {
      axios
        .post("http://localhost:5000/api/focus-time", { userId: auth.userId, focusTime }, { withCredentials: true })
        .then((response) => {
          console.log("Focus time updated successfully!");
          // Optionally, update the leaderboard with new focus time
          setAuth((prev) => ({
            ...prev,
            totalFocusMinutes: prev.totalFocusMinutes + focusTime,
          }));
        })
        .catch((error) => console.error("Error updating focus time:", error));
    } else {
      alert("Please enter a valid focus time.");
    }
  };

  // Convert minutes to HH.MM format
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const decimalTime = (remainingMinutes / 60).toFixed(2).slice(1);
    return `${hours}${decimalTime}`;
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
        {/* Display the user's rank at the top of the leaderboard stats */}
        {auth && userRank !== null && (
          <div className="mb-6 text-center">
            <p className="text-xl font-semibold text-purple-700">
              Here are your top leaderboard stats:
            </p>
            <p className="text-lg font-medium text-purple-800">
              Your Rank: {userRank ? userRank : "N/A"}
            </p>
          </div>
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
              {leaderboardData.map((user) => {
                const isAuthUser = auth && user.userId === auth.userId;
                return (
                  <motion.tr
                    key={user.userId}
                    className={`hover:bg-purple-100 transition-colors duration-300 ${
                      isAuthUser ? "bg-red-500 text-white font-bold" : "bg-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <td className="px-6 py-4 flex items-center gap-3 font-semibold text-xl">
                      {getTrophy(user.rank)}
                      {user.rank}
                    </td>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4 font-bold">
                      {formatTime(user.totalFocusMinutes)}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Focus Time Input Section */}
        {auth && (
          <div className="mt-6 text-center">
            <input
              type="number"
              value={focusTime}
              onChange={(e) => setFocusTime(Number(e.target.value))}
              className="border p-2 rounded-lg"
              placeholder="Enter focus time in minutes"
            />
            <button
              onClick={updateFocusTime}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg ml-4"
            >
              Update Focus Time
            </button>
          </div>
        )}

        {/* Pagination Controls */}
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
          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
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

        {/* Logged-in User at the Bottom if Not on Current Page */}
        {auth && !leaderboardData.some((user) => user.userId === auth.userId) && (
          <motion.div
            className="mt-8 p-6 bg-red-500 text-white font-bold text-lg rounded-lg shadow-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-xl">🔥 You are here! 🔥</p>
            <p className="text-2xl">{auth.username}</p>
            <p className="text-lg">Rank: {userRank || "N/A"}</p> {/* Displaying the rank */}
            <p className="text-lg">Total Focus Time: {formatTime(auth.totalFocusMinutes)}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Leaderboard;
