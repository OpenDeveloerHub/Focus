import React from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaTasks, FaBookOpen, FaRocket, FaUsers, FaCogs, FaLightbulb, FaTrophy } from "react-icons/fa";

const About = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-gray-100 via-gray-200 to-purple-300 text-gray-900">
      {/* Header Section */}
      <motion.h2
        className="text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-400"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About This Project
      </motion.h2>
      <motion.p
        className="text-lg text-center max-w-3xl mx-auto text-gray-700 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        This project is designed to revolutionize the way you track, analyze, and optimize your progress. With powerful features, real-time insights, and an intuitive interface, you can achieve your goals efficiently.
      </motion.p>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:bg-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.08 }}
          >
            <feature.icon className="text-6xl text-purple-600 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Additional Information Section */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          className="bg-white/90 p-10 rounded-2xl backdrop-blur-md shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-3xl font-bold mb-4 text-purple-500">Why Choose This?</h3>
          <p className="text-gray-700">
            We provide a **data-driven** approach to tracking progress, ensuring that every insight helps you improve. With a user-friendly UI and seamless **integrations**, this project is built to be intuitive and powerful.
          </p>
        </motion.div>

        <motion.div
          className="bg-white/90 p-10 rounded-2xl backdrop-blur-md shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-3xl font-bold mb-4 text-purple-600">Our Vision</h3>
          <p className="text-gray-700">
            We aim to create a **smarter**, **faster**, and **more efficient** way of managing growth. Whether you're a student, professional, or organization, our tool adapts to your needs.
          </p>
        </motion.div>
      </div>

      {/* Call-To-Action */}
      <div className="mt-20 text-center">
        <motion.h3
          className="text-4xl font-bold text-purple-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Ready to Track Your Progress?
        </motion.h3>
        <motion.p
          className="text-gray-700 mt-4 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Join us today and take your performance tracking to the next level.
        </motion.p>
        <motion.button
          className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-400 text-white rounded-xl font-semibold text-lg hover:bg-indigo-500 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Get Started 🚀
        </motion.button>
      </div>
    </section>
  );
};

// Features Data
const features = [
  { icon: FaChartLine, title: "Visual Analytics", description: "Track and visualize your progress with dynamic graphs." },
  { icon: FaTasks, title: "Task Management", description: "Stay on top of your tasks with an efficient workflow." },
  { icon: FaBookOpen, title: "Study Insights", description: "Analyze study patterns and optimize learning strategies." },
  { icon: FaRocket, title: "Growth Tracking", description: "Monitor improvements with detailed performance insights." },
  { icon: FaUsers, title: "Collaboration", description: "Work together in teams and share progress effortlessly." },
  { icon: FaCogs, title: "Customization", description: "Personalize your dashboard with custom settings and themes." },
  { icon: FaLightbulb, title: "Smart Recommendations", description: "Get AI-driven insights to improve efficiency." },
  { icon: FaTrophy, title: "Achievements", description: "Earn rewards and celebrate milestones as you grow." },
];

export default About;
