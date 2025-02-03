import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-700 fixed w-full top-0 shadow-lg z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
          Focus<span className="text-yellow-300">Flow</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-white font-medium">
          {["Home", "Dashboard", "About", "Analysis"].map((item, index) => (
            <Link
              key={index}
              to={`/${item.toLowerCase()}`}
              className="hover:text-yellow-300 transition duration-300 relative group"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/register"
            className="relative px-6 py-2 text-white font-semibold rounded-lg overflow-hidden bg-yellow-400 hover:bg-yellow-500 transition duration-300 shadow-lg group"
          >
            <span className="absolute w-full h-full bg-yellow-300 scale-0 group-hover:scale-120 transition-transform duration-300"></span>
            <span className="relative z-10">Join</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-700 p-6 border-t border-white/20 text-white space-y-4">
          {["Home", "Dashboard", "About", "Analysis"].map((item, index) => (
            <Link
              key={index}
              to={`/${item.toLowerCase()}`}
              className="block py-2 hover:text-yellow-300 transition duration-300"
            >
              {item}
            </Link>
          ))}
          <Link
            to="/register"
            className="block w-full text-center py-2 font-semibold text-white bg-yellow-400 rounded-lg hover:bg-yellow-500 transition duration-300"
          >
            Join
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
