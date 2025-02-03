import { useState, useEffect } from "react";

const Home = () => {
  const [time, setTime] = useState(25 * 60); // 25 min timer
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState("Study");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control drawer visibility
  const [taskName, setTaskName] = useState(""); // Task name
  const [taskNote, setTaskNote] = useState(""); // Task note
  const [initialTime, setInitialTime] = useState(25); // Initial time state
  const [tasks, setTasks] = useState([]); // Task list

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

  const addTask = () => {
    if (taskName.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), name: taskName, note: taskNote, completed: false }]);
      setTaskName("");
      setTaskNote("");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
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
    <div className="bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 min-h-screen">
      <div className="mt-8 flex flex-col items-center justify-center h-screen text-purple-900">
        {/* Task Info Drawer */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 ${isDrawerOpen ? "block" : "hidden"}`}
          onClick={() => setIsDrawerOpen(false)}
        />
        <div
          className={`fixed right-0 top-0 w-80 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 text-purple-900 h-full transition-transform transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"} z-50 rounded-l-xl shadow-2xl`}
        >
          <div className="p-6">
            <h2 className="text-3xl font-semibold mb-6 text-purple-900 tracking-wide">Task Details</h2>
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-purple-800">Task Name</label>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full p-3 border border-purple-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-purple-800">Task Note</label>
              <textarea
                value={taskNote}
                onChange={(e) => setTaskNote(e.target.value)}
                className="w-full p-3 border border-purple-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ease-in-out"
                rows="4"
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-purple-800">Session Type</label>
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full p-3 border border-purple-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ease-in-out"
              >
                <option value="Study">Study</option>
                <option value="Break">Break</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-purple-800">Set Time (Minutes)</label>
              <input
                type="number"
                value={initialTime}
                onChange={(e) => setInitialTime(Number(e.target.value))}
                min="5"
                className="w-full p-3 border border-purple-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="flex justify-end gap-6">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-6 py-3 bg-purple-200 text-purple-900 rounded-lg hover:bg-purple-300 transition duration-300 transform hover:scale-105 shadow-md"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105 shadow-md"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Main Timer Section */}
        <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-lg border border-white/30 w-96 flex flex-col items-center">
          <h1 className="text-4xl font-semibold mb-6 text-center uppercase tracking-wider text-purple-900">{sessionType} Session</h1>

          <div className="relative w-50 h-50 mb-6">
            {/* Circular Timer */}
            <svg className="w-full h-full transform -rotate-90" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="50%"
                cy="50%"
                r="90"
                stroke="#9F7AEA"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="90"
                stroke="#6B46C1"
                strokeWidth="10"
                fill="none"
                style={getCircleStroke(time)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-5xl text-purple-900">
              {formatTime(time)}
            </div>
          </div>

          {/* Task Details Display */}

          <div className="flex gap-6 justify-center">
            <button
              onClick={() => setIsDrawerOpen(true)} // Open the task drawer
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 transition duration-300 text-white font-semibold text-lg rounded-xl shadow-lg transform hover:scale-105"
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

      {/* Task List */}
      <div className="mt-8 ml-8">
        {tasks.map(task => (
          <div key={task.id} className="mb-4 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 w-80">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className={`ml-3 text-lg ${task.completed ? 'line-through text-purple-400' : 'text-purple-900'}`}>
                  {task.name}
                </span>
              </div>
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105"
              >
                Edit
              </button>
            </div>
            {task.note && (
              <p className={`mt-2 text-sm ${task.completed ? 'line-through text-purple-400' : 'text-purple-700'}`}>
                {task.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;