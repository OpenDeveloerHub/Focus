import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Set the Authorization header whenever the token changes
  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common["Authorization"] = auth.token;
    }
  }, [auth.token]);

  // Initialize auth from localStorage
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth(prevState => ({
        ...prevState,
        user: parseData.user,
        token: parseData.token,
      }));
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
