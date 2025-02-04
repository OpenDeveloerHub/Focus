import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const Setting = ({ open, setOpen, formData, setFormData, time, setTime, setFixtime }) => {
  return (
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
                    onChange={() =>
                      setFormData({
                        ...formData,
                        theme: formData.theme === "light" ? "dark" : "light",
                      })
                    }
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
                  value={Math.floor(time / 60)}
                  onChange={(e) => {
                    setTime(e.target.value * 60);
                    setFixtime(e.target.value * 60);
                  }}
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
  );
};

export default Setting;