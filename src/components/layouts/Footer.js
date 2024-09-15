import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";
import Logo from "../../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="text-gray-200 bg-gray-900">
      <div className="w-full max-w-screen-xl p-6 mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Logo and Branding */}
          <div className="flex items-center mb-4 space-x-3 sm:mb-0">
            <img src={Logo} className="h-10" alt="Diva Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Diva Cosmetics
            </span>
          </div>

          {/* Footer Navigation Links */}
          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-400 sm:mb-0">
            <li>
              <a href="#" className="hover:text-white me-4 md:me-6">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white me-4 md:me-6">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Middle Section with Social Media and Newsletter */}
        <div className="my-6 sm:my-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Social Media Links */}
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaPinterest size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods & Rights */}
        <div className="pt-6 border-t border-gray-700 sm:flex sm:items-center sm:justify-between">
          {/* Copyright */}
          <span className="block text-sm text-gray-400 sm:text-right">
            © {new Date().getFullYear()} Diva Cosmetics. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
