import { useState, useEffect } from "react";

const Home = () => {
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
    const offset = (time / (sessionType === "Focus" ? 25 * 60 : sessionType === "Break" ? 5 * 60 : 15 * 60)) * circumference;
    return {
      strokeDasharray: circumference,
      strokeDashoffset: offset,
    };
  };

  return (
    <div className="bg-gradient-to-br from-[#cacaff] via-[#e4e4ff] to-[#ffffff] min-h-screen">
      <main className="mt-15 p-6 text-center">
        <div className="relative">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#a283ff] via-[#6868b3] to-[#e4e4ff] bg-clip-text text-transparent animate-pulse">
            Welcome to FocusFlow
          </h1>
          <p className="mt-4 text-lg text-[#6868b3] transition-all duration-500 ease-in-out transform hover:text-[#a283ff] hover:scale-105 hover:tracking-wider">
            Track your productivity and achieve your goals.
          </p>
        </div>
      </main>

      <div className="flex flex-col md:flex-row min-h-screen mt-15 h-80">
        {/* Timer Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8 h-102">
          <div className="backdrop-blur-lg bg-[#e4e4ff] p-8 rounded-2xl shadow-lg border border-white/30 w-96 flex flex-col items-center">
            {/* <h1 className="text-4xl font-semibold mb-6 text-center uppercase tracking-wider text-[#6868b3]">{sessionType} Session</h1> */}
            {/* Session Type Buttons */}
            <div className="flex gap-4 justify-center mt-6">
  <button
    onClick={() => setSessionType("Focus")}
    className={`px-6 py-2 text-[#6868b3] border-0 transition duration-300 ${
      sessionType === "Focus" ? "bg-[#a283ff] text-white font-semibold" : ""
    }`}
  >
    Focus
  </button>
  <button
    onClick={() => setSessionType("Break")}
    className={`px-6 py-2 text-[#6868b3] border-0 transition duration-300 ${
      sessionType === "Break" ? "bg-[#a283ff] text-white font-semibold" : ""
    }`}
  >
    Break
  </button>
  <button
    onClick={() => setSessionType("Long Break")}
    className={`px-2 py-2 text-[#6868b3] border-0 transition duration-300 ${
      sessionType === "Long Break" ? "bg-[#a283ff] text-white font-semibold" : ""
    }`}
  >
    Long Break
  </button>
</div>






            <div className="relative w-50 h-50 mb-6">
              {/* Circular Timer */}
              <svg className="w-full h-full transform -rotate-90" xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="50%"
                  cy="50%"
                  r="90"
                  stroke="#a283ff"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="90"
                  stroke="#fff"
                  strokeWidth="10"
                  fill="none"
                  style={getCircleStroke(time)}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-5xl text-[#6868b3]">
                {formatTime(time)}
              </div>
            </div>

            {/* Task Controls */}
            <div className="flex gap-6 justify-center">
              <button
                onClick={toggleTimer}
                className="w-full px-6 py-3 bg-[#a283ff] hover:bg-[#e4e4ff] transition duration-300 text-white font-semibold text-lg shadow-lg transform hover:scale-105"
              >
                {isActive ? "Pause" : "Start"}
              </button>
              {/* <button
                onClick={resetTimer}
                className="w-full px-6 py-3 bg-[#E74C3C] hover:bg-[#F14D5C] transition duration-300 text-white font-semibold text-lg shadow-lg transform hover:scale-105"
              >
                Reset
              </button> */}
            </div>
          </div>
        </div>

        {/* Task List Section */}
        <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-xl h-102">
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
              className="w-full p-3 border border-[#cacaff] rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#6868b3] transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-[#6868b3]">Task Note</label>
            <textarea
              value={taskNote}
              onChange={(e) => setTaskNote(e.target.value)}
              className="w-full p-3 border border-[#cacaff] rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#6868b3] transition-all duration-300 ease-in-out"
              rows="4"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={addTask}
              className="px-4 py-2 bg-[#6868b3] text-white rounded-lg hover:bg-[#a283ff] transition duration-300"
            >
              Save
            </button>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="px-4 py-2 bg-[#E74C3C] text-white rounded-lg hover:bg-[#F14D5C] transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
