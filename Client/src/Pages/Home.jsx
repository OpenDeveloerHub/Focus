import { useState, useEffect } from "react";

const Home = () => {
  const [time, setTime] = useState(25 * 60); // 25 min timer
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState("Study");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control drawer visibility
  const [taskName, setTaskName] = useState(""); // Task name
  const [taskNote, setTaskNote] = useState(""); // Task note
  const [initialTime, setInitialTime] = useState(25); // Initial time state

  // Update the time whenever initialTime changes
  useEffect(() => {
    setTime(initialTime * 60);
  }, [initialTime]);

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
      if (sessionType === "Study") {
        setSessionType("Break");
        setTime(5 * 60); // 5 min break
      } else {
        setSessionType("Study");
        setTime(initialTime * 60); // Use the initial time when the session switches back to Study
      }
      setIsActive(false);
    }
  }, [time, sessionType, initialTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSessionType("Study");
    setTime(initialTime * 60); // Reset to initial time
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartTask = () => {
    setIsDrawerOpen(false);
    setTime(initialTime * 60); // Set time to initial time when starting the task
    setIsActive(true);
  };

  const increaseTime = () => {
    setInitialTime((prevTime) => prevTime + 5); // Increases initial time by 5 minutes
  };

  const decreaseTime = () => {
    setInitialTime((prevTime) => (prevTime > 5 ? prevTime - 5 : 5)); // Decreases initial time by 5 minutes, minimum 5 minutes
  };

  // Circular Timer styles
  const getCircleStroke = (time) => {
    const radius = 90; // Radius of the circle
    const circumference = 2 * Math.PI * radius;
    const offset = (time / (initialTime * 60)) * circumference;
    return {
      strokeDasharray: circumference,
      strokeDashoffset: offset,
    };
  };

  return (
    <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 ">
    <div className="mt-8 flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white">
      {/* Task Info Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 ${isDrawerOpen ? "block" : "hidden"}`}
        onClick={() => setIsDrawerOpen(false)}
      />
      <div
        className={`fixed right-0 top-0 w-80 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-400 text-gray-800 h-full transition-transform transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"} z-50 rounded-l-xl shadow-2xl`}
      >
        <div className="p-6">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 tracking-wide">Task Details</h2>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-700">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-700">Task Note</label>
            <textarea
              value={taskNote}
              onChange={(e) => setTaskNote(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
              rows="4"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-700">Session Type</label>
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
            >
              <option value="Study">Study</option>
              <option value="Break">Break</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-700">Set Time (Minutes)</label>
            <input
              type="number"
              value={initialTime}
              onChange={(e) => setInitialTime(Number(e.target.value))}
              min="5"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="flex justify-end gap-6">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 transform hover:scale-105 shadow-md"
            >
              Cancel
            </button>
            <button
              onClick={handleStartTask}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-md"
            >
              Start Timer
            </button>
          </div>
        </div>
      </div>

      {/* Main Timer Section */}
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-lg border border-white/30 w-96 flex flex-col items-center">
        <h1 className="text-4xl font-semibold mb-6 text-center uppercase tracking-wider text-gray-100">{sessionType} Session</h1>

        <div className="relative w-50 h-50 mb-6">
          {/* Circular Timer */}
          <svg className="w-full h-full transform -rotate-90" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="50%"
              cy="50%"
              r="90"
              stroke="#ff5500"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="50%"
              cy="50%"
              r="90"
              stroke="#1aff00"
              strokeWidth="10"
              fill="none"
              style={getCircleStroke(time)}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-5xl text-gray-100">
            {formatTime(time)}
          </div>
        </div>

        {/* Task Details Display */}

        <div className="flex gap-6 justify-center">
          <button
            onClick={() => setIsDrawerOpen(true)} // Open the task drawer
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 transition duration-300 text-white font-semibold text-lg rounded-xl shadow-lg transform hover:scale-105"
          >
            Add Task
          </button>
          <button
            onClick={toggleTimer}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-semibold text-lg rounded-xl shadow-lg transform hover:scale-105"
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 transition duration-300 text-white font-semibold text-lg rounded-xl shadow-lg transform hover:scale-105"
          >
            Reset
          </button>
        </div>

        {/* Increase and Decrease Timer Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={increaseTime}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Increase Time
          </button>
          <button
            onClick={decreaseTime}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Decrease Time
          </button>
        </div>
      </div>
    </div>
    {taskName && (
    <div className="mt-4 ml-6 bg-white p-6 rounded-lg mb-6 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 w-60">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{taskName}</h2>
        <p className="text-lg text-gray-600">{taskNote}</p>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span className="flex items-center space-x-2">
            <i className="fas fa-calendar-alt"></i>
            <span>Due: {new Date().toLocaleDateString()}</span> {/* You can modify to show a due date if available */}
        </span>
        <button onClick={() => setIsDrawerOpen(true)}  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition duration-300 transform hover:scale-105">
            Edit
        </button>
        </div>
    </div>
    )}
    <br />

    </div>
  );
};

export default Home;
