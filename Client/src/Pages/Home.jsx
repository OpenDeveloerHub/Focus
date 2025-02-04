import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X } from "lucide-react";
import Task from "../Components/Task";
import Setting from "../Components/Setting";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useAuth(); 
  const [formData, setFormData] = useState({
  name: auth?.user?.username || "Guest",
  email: auth?.user?.email || "guest@gmail.com",
  theme: "light",
});

  const [time, setTime] = useState(25 * 60); // Default Focus Time = 25 minutes
  const [fixTime, setFixtime] = useState(25*60);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState("Focus");

  // Update the time whenever the sessionType changes
  useEffect(() => {
    if (sessionType === "Focus") {
      setTime(25 * 60); // Focus time = 25 minutes
    } else if (sessionType === "Break") {
      setTime(5 * 60); // Break time = 5 minutes
    } else if (sessionType === "Long Break") {
      setTime(15 * 60); // Long Break time = 15 minutes
    }
    setFormData({name: auth?.user?.username || "Guest",
      email: auth?.user?.email || "guest@gmail.com",
      theme: "light",})
  }, [sessionType]);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (time === 0) {
      if (sessionType === "Focus") {
        setSessionType("Break");
        setIsActive(false); // Ensure timer is paused when switching to Break
      } else if (sessionType === "Break") {
        setSessionType("Long Break");
        setIsActive(false); // Ensure timer is paused when switching to Long Break
      } else {
        setSessionType("Focus");
        setIsActive(false); // Ensure timer is paused when switching back to Focus
      }
    }
  }, [time, sessionType]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSessionType("Focus");
    setTime(25 * 60); // Reset to 25 minutes when switching back to Focus
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Circular Timer styles
  const getCircleStroke = (time) => {
    const radius = 90; // Radius of the circle
    const circumference = 2 * Math.PI * radius;
    const offset = (time / (sessionType === "Focus" ? time * 60 : sessionType === "Break" ? 5 * 60 : 15 * 60)) * circumference;
    return {
      strokeDasharray: circumference,
      strokeDashoffset: offset,
    };
  };
  return (
    <div className="bg-gradient-to-br from-gray-100 via-[#e4e4ff] to-[#ffffff] min-h-screen">
      <main className="mt-12 p-6 text-center">
        <div className="relative">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#a283ff] via-[#6868b3] to-[#e4e4ff] bg-clip-text text-transparent animate-pulse">
            Welcome to FocusFlow
          </h1>
          <p className="mt-4 text-xl text-[#6868b3] transition-all duration-500 ease-in-out transform hover:text-[#a283ff] hover:scale-105 hover:tracking-wider">
            Track your productivity and achieve your goals.
          </p>
        </div>
      </main>
  
      <div className="flex flex-col md:flex-row min-h-screen mt-12 space-y-8 md:space-y-0">

        {/* Timer Section */}
        <div className="mb-16 w-full md:w-1/2 flex justify-center items-center p-8 mt-7 h-102">
          <div className="backdrop-blur-lg bg-[#e4e4ff] p-8 rounded-2xl shadow-lg border border-white/30 w-96 flex flex-col items-center">
            <div className="flex gap-4 justify-center mt-6">
              <button
                onClick={() => setSessionType("Focus")}
                className={`px-6 py-2 text-[#6868b3] border-0 transition duration-300 rounded-2xl hover:bg-green-300 hover:text-white hover:font-bold ${sessionType === "Focus" ? "rounded-2xl text-white font-bold bg-green-500" : ""}`}
              >
                Focus
              </button>
              <button
                onClick={() => setSessionType("Break")}
                className={`px-6 py-2 text-[#6868b3] border-0 transition duration-300 hover:bg-orange-300 rounded-2xl hover:text-white hover:font-bold ${sessionType === "Break" ? " rounded-2xl text-white font-bold bg-orange-600" : ""}`}
              >
                Break
              </button>
              <button onClick={() => setSessionType("Long Break")} 
              className={`py-2 text-[#6868b3] border-0 transition duration-300 rounded-2xl hover:bg-gray-400 hover:text-white hover:font-bold ${sessionType === "Long Break" ? " text-white font-bold bg-gray-600" : ""}`} style={{ width: '125px' }} >
                Long Break
              </button>
            </div>
            
            <div className="relative w-64 h-64 mb-6">
              {/* Circular Timer */}
              <svg className="w-full h-full transform -rotate-90" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50%" cy="50%" r="90" stroke="#a283ff" strokeWidth="12" fill="none" />
                <circle cx="50%" cy="50%" r="90" stroke="#fff" strokeWidth="12" fill="none" style={getCircleStroke(time)} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-5xl text-[#6868b3]">
                {formatTime(time)}
              </div>
            </div>
  
            {/* Task Controls */}
            <div className="flex gap-6 justify-center mb-4">
              {/* Start / Pause Button */}
              <motion.button
                onClick={toggleTimer}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-lg shadow-lg rounded-lg transition-all duration-300 hover:from-yellow-400 hover:to-orange-500"
              >
                {isActive ? "Pause" : "Start"}
              </motion.button>
              {/* Reset Button */}
              <motion.button
                onClick={resetTimer}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-red-500 text-white font-bold text-lg shadow-lg rounded-lg transition-all duration-300 hover:bg-red-600"
              >
                Reset
              </motion.button>
            {/* Settings Button */}
              <motion.button
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-blue-500 text-white rounded-full shadow-lg transition-all duration-300 hover:bg-blue-600"
              >
                <Settings size={24} />
              </motion.button>
            </div>
  
            {/* Settings Modal */}
            <Setting open={open} setOpen={setOpen} formData={formData} setFormData={setFormData} time ={time}setTime = {setTime}setFixtime = {setFixtime} />
          </div>
        </div>
        {/* Task List Section */}
        <Task className="w-full h-100 md:w-1/3 p-6 bg-white rounded-lg shadow-xl"/>
      </div>
    </div>
  );
};  
export default Home;