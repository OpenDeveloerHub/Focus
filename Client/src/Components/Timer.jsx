import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const SettingsModal = ({ open, setOpen, formData, setFormData }) => {
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
