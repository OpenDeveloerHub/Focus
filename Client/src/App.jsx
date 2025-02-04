import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Home from "./Pages/Home";
import DashBoard from "./Pages/DashBoard";
import Plan from "./Pages/Plan";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer.jsx";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const App = () => {
  return (
    <div>
      
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/about" element={<About />} />
          <Route path="/analysis" element={<Plan />} />
          <Route path="/login" element = {<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
};

export default App;
