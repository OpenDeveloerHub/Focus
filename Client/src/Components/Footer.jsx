import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-700 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              FocusFlow is your go-to platform for enhancing productivity and focus. We provide tools to help you stay on track and accomplish your goals with ease.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li>
                <Link to="/" className="text-sm hover:text-yellow-300 transition duration-300">Home</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm hover:text-yellow-300 transition duration-300">Dashboard</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-yellow-300 transition duration-300">About</Link>
              </li>
              <li>
                <Link to="/plan" className="text-sm hover:text-yellow-300 transition duration-300">Analysis</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-sm">Email: support@focusflow.com</p>
            <p className="text-sm">Phone: +1 234 567 890</p>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FaGithub size={24} className="hover:text-yellow-300 transition duration-300" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} className="hover:text-yellow-300 transition duration-300" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} className="hover:text-yellow-300 transition duration-300" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} className="hover:text-yellow-300 transition duration-300" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-12 text-center text-sm">
          <p>© 2025 FocusFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
