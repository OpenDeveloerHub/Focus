"use client";

import { useState, useEffect } from "react";

export default function Setting() {
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState({
    user: {
      username: "Jyoti Singh",
      email: "jyoti.singh@example.com",
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Ensure auth data is set when available
  useEffect(() => {
    if (auth?.user) {
      setFormData({
        name: auth.user.username || "",
        email: auth.user.email || "",
      });
    }
  }, [auth]);

  return (
    <>
      {/* Button to open dialog */}
      <button 
        onClick={() => setOpen(true)} 
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Open Drawer
      </button>

      {/* Dialog Box */}
      
    </>
  );
}
