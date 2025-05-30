import React from 'react'

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi"
import { BiBookOpen } from "react-icons/bi"
import footerLogo from "../assets/WBH4.svg"


const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-white py-12 w-full relative overflow-hidden border-t border-gray-700/50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/5 via-transparent to-dark-accent/5 opacity-50"></div>
      
      <div className="w-full relative z-10">
        {/* Top Section */}
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 px-4">
          {/* Left Side - Logo and Info */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start space-y-6">
            <div className="flex items-center gap-3">
              <img src={footerLogo} alt="Logo" className="w-16 h-16" />
              <div>
                <h3 className="text-xl font-bold text-dark-text">BookHub</h3>
                <p className="text-dark-accent text-sm">University Bookstore</p>
              </div>
            </div>
            
            <div className="space-y-3 text-center lg:text-left">
              <div className="flex items-center gap-3 justify-center lg:justify-start text-gray-300 hover:text-dark-accent transition-colors duration-300">
                <HiLocationMarker className="w-4 h-4 text-dark-accent" />
                <span className="text-sm">University of Waterloo, ON</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start text-gray-300 hover:text-dark-accent transition-colors duration-300">
                <HiPhone className="w-4 h-4 text-dark-accent" />
                <span className="text-sm">+1 (519) 888-4567</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start text-gray-300 hover:text-dark-accent transition-colors duration-300">
                <HiMail className="w-4 h-4 text-dark-accent" />
                <span className="text-sm">info@uwbookhub.ca</span>
              </div>
            </div>
          </div>

          {/* Middle - Quick Links */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="text-center lg:text-left">
              <h4 className="text-lg font-bold text-dark-text mb-4 flex items-center gap-2 justify-center lg:justify-start">
                <BiBookOpen className="w-5 h-5 text-dark-accent" />
                Quick Links
              </h4>
              <ul className="grid grid-cols-2 gap-3 text-sm">
                <li><a href="#home" className="hover:text-dark-accent transition-colors duration-300 hover:underline">Home</a></li>
                <li><a href="#books" className="hover:text-dark-accent transition-colors duration-300 hover:underline">All Books</a></li>
                <li><a href="#sell" className="hover:text-dark-accent transition-colors duration-300 hover:underline">Sell Books</a></li>
                <li><a href="#about" className="hover:text-dark-accent transition-colors duration-300 hover:underline">About Us</a></li>
                <li><a href="#contact" className="hover:text-dark-accent transition-colors duration-300 hover:underline">Contact</a></li>
                <li><a href="#help" className="hover:text-dark-accent transition-colors duration-300 hover:underline">Help Center</a></li>
              </ul>
            </div>
          </div>

          {/* Right Side - Newsletter */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="text-center lg:text-left">
              <h4 className="text-lg font-bold text-dark-text mb-4">Stay Updated</h4>
              <p className="mb-4 text-sm text-gray-300 leading-relaxed">
                Subscribe to our newsletter for the latest book arrivals, study tips, and exclusive deals!
              </p>
              <div className="flex max-w-md mx-auto lg:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-l-xl text-black text-sm bg-gray-100 border border-gray-300 focus:outline-none focus:border-dark-accent transition-colors duration-300"
                />
                <button className="bg-gradient-to-r from-dark-accent to-yellow-300 text-black px-6 py-3 rounded-r-xl hover:from-yellow-300 hover:to-dark-accent transition-all duration-300 text-sm font-bold shadow-lg hover:shadow-dark-accent/25 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-gray-700/50 px-4 gap-6">
          {/* Left Side - Copyright and Links */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-gray-400 text-sm">
              &copy; 2025 UW BookHub. All rights reserved.
            </p>
            <ul className="flex gap-6 text-xs">
              <li><a href="#privacy" className="hover:text-dark-accent transition-colors duration-300 hover:underline">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-dark-accent transition-colors duration-300 hover:underline">Terms of Service</a></li>
              <li><a href="#cookies" className="hover:text-dark-accent transition-colors duration-300 hover:underline">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Right Side - Social Icons */}
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-dark-accent/20 p-3 rounded-xl hover:text-dark-accent transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <FaFacebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-dark-accent/20 p-3 rounded-xl hover:text-dark-accent transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-dark-accent/20 p-3 rounded-xl hover:text-dark-accent transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer