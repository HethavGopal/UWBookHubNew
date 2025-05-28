import React from 'react'

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import footerLogo from "../assets/WBH4.svg"


const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 w-full">
      <div className="w-full">
        {/* Top Section */}
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-4">
          {/* Left Side - Logo and Nav */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
            <img src={footerLogo} alt="Logo" className="mb-4 w-24" />
            <ul className="flex flex-col md:flex-row gap-4 text-sm items-center md:items-start">
              <li><a href="#home" className="hover:text-[#FF3811] transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-[#FF3811] transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-[#FF3811] transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-[#FF3811] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Right Side - Newsletter */}
          <div className="w-full md:w-1/2">
            <p className="mb-3 text-sm text-center md:text-left">
              Subscribe to our newsletter to receive the latest updates, news, and offers!
            </p>
            <div className="flex max-w-md mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-l-md text-black text-sm"
              />
              <button className="bg-[#FFB700] text-black px-4 py-2 rounded-r-md hover:bg-[#FF3811] hover:text-white transition-colors text-sm font-medium whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center mt-8 border-t border-gray-800 pt-4 px-4">
          {/* Left Side - Privacy Links */}
          <ul className="flex gap-6 mb-4 md:mb-0 text-xs">
            <li><a href="#privacy" className="hover:text-[#FF3811] transition-colors">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-[#FF3811] transition-colors">Terms of Service</a></li>
          </ul>

          {/* Right Side - Social Icons */}
          <div className="flex gap-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFB700] transition-colors">
              <FaFacebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFB700] transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFB700] transition-colors">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer