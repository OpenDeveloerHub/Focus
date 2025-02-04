import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X } from "lucide-react";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useAuth(); 
  const [formData, setFormData] = useState({
  name: auth?.user?.username || "Guest",
  email: auth?.user?.email || "guest@gmail.com",
  theme: "light",
});

  const [time, setTime] = useState(25 * 60); // Default Focus Time = 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState("Focus");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control drawer visibility
  const [taskName, setTaskName] = useState(""); // Task name
  const [taskNote, setTaskNote] = useState(""); // Task note
  const [tasks, setTasks] = useState([
    { id: Date.now(), name: "Conqueror", note: "Conquer the world", completed: false },
    { id: Date.now() + 1, name: "Focused Study Session", note: "Spend 60 minutes studying, away from distractions.", completed: false },
    { id: Date.now() + 2, name: "Exercise", note: "Take a 30-minute walk or workout session to stay active.", completed: false }
  ]);

  // Update the time whenever the sessionType changes
  useEffect(() => {
    if (sessionType === "Focus") {
      setTime(25 * 60); // Focus time = 25 minutes
    } else if (sessionType === "Break") {
      setTime(5 * 60); // Break time = 5 minutes
    } else if (sessionType === "Long Break") {
      setTime(15 * 60); // Long Break time = 15 minutes
    }
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
      } else if (sessionType === "Break") {
        setSessionType("Long Break");
      } else {
        setSessionType("Focus");
      }
      setIsActive(false);
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

  const addTask = () => {
    if (taskName.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), name: taskName, note: taskNote, completed: false }]);
      setTaskName("");
      setTaskNote("");
      setIsDrawerOpen(false);
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  // Circular Timer styles
  const getCircleStroke = (time) => {
    const radius = 90; // Radius of the circle
    const circumference = 2 * Math.PI * radius;
    const offset = (time / (sessionType === "Focus" ? {time} * 60 : sessionType === "Break" ? 5 * 60 : 15 * 60)) * circumference;
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
        <div className="mb-16 w-full md:w-1/2 flex justify-center items-center p-8 h-102">
          <div className="backdrop-blur-lg bg-[#e4e4ff] p-8 rounded-2xl shadow-lg border border-white/30 w-96 flex flex-col items-center">
            <div className="flex gap-4 justify-center mt-6">
              <button
                onClick={() => setSessionType("Focus")}
                className={`px-6 py-2 text-[#6868b3] border-0 transition duration-300 rounded-2xl hover:bg-green-300 hover:text-white hover:font-bold ${sessionType === "Focus" ? "bg-[#a283ff] rounded-2xl text-white font-bold bg-green-500" : ""}`}
              >
                Focus
              </button>
              <button
                onClick={() => setSessionType("Break")}
                className={`px-6 py-2 text-[#6868b3] border-0 transition duration-300 hover:bg-orange-300 rounded-2xl hover:text-white hover:font-bold ${sessionType === "Break" ? "bg-[#a283ff] rounded-2xl text-white font-bold bg-orange-600" : ""}`}
              >
                Break
              </button>
              <button
                onClick={() => setSessionType("Long Break")}
                className={`px-6 py-2 text-[#6868b3] border-0 transition duration-300 rounded-2xl hover:bg-gray-400 hover:text-white hover:font-bold ${sessionType === "Long Break" ? "bg-[#a283ff] text-white font-bold bg-gray-600 " : ""}`}
              >
                Long Break
              </button>
            </div>
  
            <div className="relative w-64 h-64 mb-6">
              {/* Circular Timer */}
              <svg className="w-full h-full transform -rotate-90" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50%" cy="50%" r="90" stroke="#a283ff" strokeWidth="10" fill="none" />
                <circle cx="50%" cy="50%" r="90" stroke="#fff" strokeWidth="10" fill="none" style={getCircleStroke(time)} />
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
            <AnimatePresence>
            {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full h-full z-50"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white p-8 rounded-xl shadow-2xl w-96 max-w-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
                <p className="text-gray-600 text-sm">Configure your preferences here</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-red-500 focus:outline-none transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  readOnly
                  className="w-full px-4 py-3 mt-2 border rounded-md shadow-sm bg-gray-100 text-gray-600 focus:ring-2 focus:ring-[#6868b3] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  value={formData.email}
                  readOnly
                  className="w-full px-4 py-3 mt-2 border rounded-md shadow-sm bg-gray-100 text-gray-600 focus:ring-2 focus:ring-[#6868b3] focus:outline-none"
                />
              </div>

              {/* Theme Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Theme</label>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-gray-700">Light</span>
                  <input
                    type="checkbox"
                    checked={formData.theme === "dark"}
                    // onChange={handleThemeToggle}
                    className="toggle-checkbox appearance-none w-12 h-6 rounded-full bg-gray-300 relative cursor-pointer transition-all"
                  />
                  <span className="text-gray-700">Dark</span>
                </div>
              </div>

              {/* Time Input */}
              <div>
  <label className="block text-sm font-medium text-gray-700">Time (minutes)</label>
  <input
    type="number"
    value={Math.floor(time / 60)} // Convert seconds back to minutes for display
    onChange={(e) => setTime(e.target.value * 60)} // Store the value in seconds
    className="w-full px-4 py-3 mt-2 border rounded-md shadow-sm bg-gray-100 text-gray-600 focus:ring-2 focus:ring-[#6868b3] focus:outline-none"
  />
</div>

              <motion.button
                onClick={() => setOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-red-500 text-white py-3 mt-4 rounded-md shadow-md transition-all duration-300 hover:bg-red-600 focus:outline-none"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
            </AnimatePresence>
          </div>
        </div>
  
        {/* Task List Section */}
        <div className="w-full h-100 md:w-1/3 p-6 bg-white rounded-lg shadow-xl">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-3xl font-semibold text-[#6868b3]">Tasks</h2>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-4 py-2 bg-[#6868b3] text-white rounded-lg hover:bg-[#a283ff] transition duration-300"
            >
              Add Task
            </button>
          </div>
  
          {/* Task List with Scrollbar */}
          <div className="w-full h-60 overflow-y-auto bg-white p-4">
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="form-checkbox h-4 w-4 text-[#6868b3] rounded focus:ring-2 focus:ring-[#a283ff]"
                      />
                      <span
                        className={`ml-3 text-base font-semibold ${task.completed ? 'line-through text-[#cacaff]' : 'text-[#6868b3]'}`}
                      >
                        {task.name}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsDrawerOpen(true)}
                      className="px-4 py-2 bg-[#6868b3] text-white rounded-lg hover:bg-[#a283ff] transition duration-300"
                    >
                      Edit
                    </button>
                  </div>
                  {task.note && (
                    <p className={`mt-2 text-sm ${task.completed ? 'line-through text-[#cacaff]' : 'text-[#6868b3]'}`}>
                      {task.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  
      {/* Task Info Drawer */}
      <div
        className={`fixed inset-0 bg-gray-300/30 z-40 ${isDrawerOpen ? "block" : "hidden"}`}
        onClick={() => setIsDrawerOpen(false)}
      />
      <div
        className={`fixed right-0 top-0 w-80 bg-gradient-to-br from-[#e4e4ff] via-[#cacaff] to-[#a283ff] text-gray-900 h-full transition-transform transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"} z-50 rounded-l-xl shadow-2xl`}
      >
        <div className="p-6">
          <h2 className="text-3xl font-semibold mb-6 text-[#6868b3] tracking-wide">Task Details</h2>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-[#6868b3]">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full p-3 border border-[#cacaff] rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#a283ff]"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-[#6868b3]">Notes</label>
            <textarea
              rows="4"
              value={taskNote}
              onChange={(e) => setTaskNote(e.target.value)}
              className="w-full p-3 border border-[#cacaff] rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#a283ff]"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="px-4 py-2 bg-[#6868b3] text-white rounded-lg hover:bg-[#a283ff] transition duration-300"
            >
              Close
            </button>
            <button
              onClick={addTask}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            >
              Save Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};  

export default Home;
