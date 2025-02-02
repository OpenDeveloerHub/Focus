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
          <Link
            to="/"
            className="hover:text-yellow-300 transition duration-300 relative group"
          >
            Home
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-yellow-300 transition duration-300 relative group"
          >
            Dashboard
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-300 transition duration-300 relative group"
          >
            About
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/plan"
            className="hover:text-yellow-300 transition duration-300 relative group"
          >
            Analysis
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <SignedOut>
            <SignInButton className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
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
        <div className="md:hidden bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-700 p-6 border-t border-white/20 text-white">
          <Link to="/" className="block py-2 hover:text-yellow-300 transition duration-300">
            Home
          </Link>
          <Link to="/dashboard" className="block py-2 hover:text-yellow-300 transition duration-300">
            Dashboard
          </Link>
          <Link to="/about" className="block py-2 hover:text-yellow-300 transition duration-300">
            About
          </Link>
          <Link to="/plan" className="block py-2 hover:text-yellow-300 transition duration-300">
            Plan
          </Link>
          <SignedOut>
            <SignInButton className="block mt-4 w-full text-center bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg shadow-lg transition duration-300" />
          </SignedOut>
          <SignedIn>
            <div className="mt-4 flex justify-center">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
