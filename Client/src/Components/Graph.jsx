import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Registering chart elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graph = () => {
  const [filter, setFilter] = useState("weekly"); // Default filter to weekly
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filteredStudyData, setFilteredStudyData] = useState([]);
  
  // Dummy Data for testing
  const taskData = [
    { date: "2025-02-01", timeSpent: 3 },
    { date: "2025-02-02", timeSpent: 2 },
    { date: "2025-02-03", timeSpent: 1 },
    { date: "2025-02-04", timeSpent: 4 },
    { date: "2025-02-05", timeSpent: 2.5 },
    { date: "2025-02-06", timeSpent: 3.5 },
    { date: "2025-02-07", timeSpent: 1 },
  ];

  const studyData = [
    { date: "2025-02-01", studyHours: 5 },
    { date: "2025-02-02", studyHours: 3 },
    { date: "2025-02-03", studyHours: 2 },
    { date: "2025-02-04", studyHours: 6 },
    { date: "2025-02-05", studyHours: 4 },
    { date: "2025-02-06", studyHours: 3 },
    { date: "2025-02-07", studyHours: 2.5 },
  ];

  // Function to calculate growth percentage between today and the previous day within the filtered data
  const calculateGrowthPercentage = (filteredData) => {
    const lastIndex = filteredData.length - 1;
    if (lastIndex > 0) {
      const yesterday = filteredData[lastIndex - 1].studyHours;
      const today = filteredData[lastIndex].studyHours;
      const growth = ((today - yesterday) / yesterday) * 100;
      return growth;
    }
    return 0;
  };

  useEffect(() => {
    // Filtering tasks based on the selected filter (weekly, monthly, or yearly)
    const filterData = (data) => {
      const now = new Date();
      return data.filter((item) => {
        const itemDate = new Date(item.date);
        if (filter === "weekly") {
          const diff = now - itemDate;
          return diff <= 7 * 24 * 60 * 60 * 1000; // Last 7 days
        }
        if (filter === "monthly") {
          return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
        }
        if (filter === "yearly") {
          return itemDate.getFullYear() === now.getFullYear();
        }
        return true;
      });
    };

    setFilteredTasks(filterData(taskData));
    setFilteredStudyData(filterData(studyData));
  }, [filter]);

  const taskChartData = {
    labels: filteredTasks.map((task) => task.date),
    datasets: [
      {
        label: "Task Time (in hours)",
        data: filteredTasks.map((task) => task.timeSpent),
        fill: false,
        borderColor: "#FF5733",
        tension: 0.1,
      },
    ],
  };

  const studyChartData = {
    labels: filteredStudyData.map((data) => data.date),
    datasets: [
      {
        label: "Study Time (in hours)",
        data: filteredStudyData.map((data) => data.studyHours),
        fill: false,
        borderColor: "#33FF57",
        tension: 0.1,
      },
      {
        label: "Growth Percentage",
        data: filteredStudyData.length > 1 
          ? filteredStudyData.slice(1).map((_, idx) => calculateGrowthPercentage(filteredStudyData.slice(0, idx + 2)))
          : [0],
        fill: false,
        borderColor: "#5733FF",
        tension: 0.1,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
      y1: {
        type: "linear",
        position: "right",
        ticks: {
          beginAtZero: true,
          max: 100,
          min: 0,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">User Task and Study Graphs</h2>
      
      {/* Filter buttons */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setFilter("weekly")} className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300">Weekly</button>
        <button onClick={() => setFilter("monthly")} className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300">Monthly</button>
        <button onClick={() => setFilter("yearly")} className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300">Yearly</button>
      </div>

      {/* Flexbox layout for dividing charts into two boxes */}
      <div className="flex gap-6">
        {/* Task Completion Chart */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl mb-4">Tasks Completion (Hours)</h3>
          <Line data={taskChartData} options={options} height={250} />
        </div>

        {/* Study Time and Growth Percentage Chart */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl mb-4">Study Time & Growth Percentage</h3>
          <Line data={studyChartData} options={options} height={250} />
        </div>
      </div>
    </div>
  );
};

export default Graph;
