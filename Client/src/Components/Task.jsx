import React, { useState } from "react";

function Task() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { 
      id: 1, name: "Sample Task", completed: false, note: "This is a sample note."
     },


     { id: Date.now() + 1, name: "Focused Study Session", note: "Spend 60 minutes studying, away from distractions.", completed: false },
     { id: Date.now() + 2, name: "Exercise", note: "Take a 30-minute walk or workout session to stay active.", completed: false }

  ]);
  const [taskName, setTaskName] = useState("");
  const [taskNote, setTaskNote] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (task) => {
    setTaskName(task.name);
    setTaskNote(task.note);
    setEditTaskId(task.id);
    setIsDrawerOpen(true);
  };

  const addTask = () => {
    if (taskName.trim() === "") return;
  
    const newTask = { id: tasks.length + 1, name: taskName, completed: false, note: taskNote };
  
    if (editTaskId) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTaskId ? { ...task, name: taskName, note: taskNote } : task
        )
      );
    } else {
      setTasks([newTask, ...tasks]); // Add new task at the top
    }
  
    setTaskName("");
    setTaskNote("");
    setEditTaskId(null);
    setIsDrawerOpen(false);
  };
  

  return (
    <div className="flex flex-col items-center w-full h-full  py-0">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl">
        <div className="mb-12 flex justify-between items-center">
          <h2 className="text-4xl font-bold text-[#4A4A8C]">Tasks</h2>
          <button
            onClick={() => {
              setTaskName("");
              setTaskNote("");
              setEditTaskId(null);
              setIsDrawerOpen(true);
            }}
            className="px-5 py-3 bg-[#4A4A8C] text-white rounded-lg text-lg hover:bg-[#6A6ABB] transition duration-300"
          >
            Add Task
          </button>
        </div>

        <div className="w-full max-h-80 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-inner">
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="form-checkbox h-5 w-5 text-[#4A4A8C] rounded focus:ring-2 focus:ring-[#6A6ABB]"
                    />
                    <span
                      className={`ml-4 text-lg font-semibold ${task.completed ? "line-through text-gray-400" : "text-[#4A4A8C]"}`}
                    >
                      {task.name}
                    </span>
                  </div>
                  <button
                    onClick={() => handleEditTask(task)}
                    className="px-4 py-2 bg-[#4A4A8C] text-white rounded-lg text-sm hover:bg-[#6A6ABB] transition duration-300"
                  >
                    Edit
                  </button>
                </div>
                {task.note && (
                  <p className="mt-2 text-gray-600 text-base">{task.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4 text-[#4A4A8C]">
              {editTaskId ? "Edit Task" : "New Task"}
            </h2>
            <label className="block text-lg font-medium mb-2 text-[#4A4A8C]">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6A6ABB]"
            />
            <label className="block text-lg font-medium mt-4 mb-2 text-[#4A4A8C]">Notes</label>
            <textarea
              rows="4"
              value={taskNote}
              onChange={(e) => setTaskNote(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6A6ABB]"
            />
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              >
                {editTaskId ? "Update Task" : "Save Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;
