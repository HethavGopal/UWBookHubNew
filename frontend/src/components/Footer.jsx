import React from 'react'

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi"
import { BiShoppingBag } from "react-icons/bi"
import footerLogo from "../assets/WBH4.svg"


const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-white py-8 sm:py-12 w-full relative overflow-hidden border-t border-gray-700/50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/5 via-transparent to-dark-accent/5 opacity-50"></div>
      
      <div className="w-full relative z-10">
        {/* Top Section */}
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-8 sm:gap-12 px-3 sm:px-4">
          {/* Left Side - Logo and Info */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3">
              <img src={footerLogo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-dark-text">UW Buy Hub</h3>
                <p className="text-dark-accent text-xs sm:text-sm">Student Marketplace</p>
              </div>
            </div>
            
            <div className="space-y-2 sm:space-y-3 text-center lg:text-left">
              <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start text-gray-300 hover:text-dark-accent transition-colors duration-300">
                <HiLocationMarker className="w-3 h-3 sm:w-4 sm:h-4 text-dark-accent" />
                <span className="text-xs sm:text-sm">
                  <span className="sm:hidden">Waterloo Campus</span>
                  <span className="hidden sm:inline">University of Waterloo, ON</span>
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start text-gray-300 hover:text-dark-accent transition-colors duration-300">
                <HiPhone className="w-3 h-3 sm:w-4 sm:h-4 text-dark-accent" />
                <span className="text-xs sm:text-sm">+1 (519) 888-4567</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start text-gray-300 hover:text-dark-accent transition-colors duration-300">
                <HiMail className="w-3 h-3 sm:w-4 sm:h-4 text-dark-accent" />
                <span className="text-xs sm:text-sm">hello@uwbuyhub.ca</span>
              </div>
            </div>
          </div>

          {/* Middle - Quick Links */}
          <div className="w-full lg:w-1/3 space-y-4 sm:space-y-6">
            <div className="text-center lg:text-left">
              <h4 className="text-base sm:text-lg font-bold text-dark-text mb-3 sm:mb-4 flex items-center gap-2 justify-center lg:justify-start">
                <BiShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-dark-accent" />
                Quick Links
              </h4>
              <ul className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                <li><a href="#home" className="hover:text-dark-accent transition-colors duration-300 hover:underline">Home</a></li>
                <li><a href="#marketplace" className="hover:text-dark-accent transition-colors duration-300 hover:underline">Marketplace</a></li>
                <li><a href="#sell" className="hover:text-dark-accent transition-colors duration-300 hover:underline">Start Selling</a></li>
                <li><a href="#about" className="hover:text-dark-accent transition-colors duration-300 hover:underline">About</a></li>
                <li><a href="#contact" className="hover:text-dark-accent transition-colors duration-300 hover:underline">Contact</a></li>
                <li><a href="#help" className="hover:text-dark-accent transition-colors duration-300 hover:underline">Help</a></li>
              </ul>
            </div>
          </div>

          {/* Right Side - Newsletter */}
          <div className="w-full lg:w-1/3 space-y-4 sm:space-y-6">
            <div className="text-center lg:text-left">
              <h4 className="text-base sm:text-lg font-bold text-dark-text mb-3 sm:mb-4">Stay Connected</h4>
              <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
                <span className="sm:hidden">Get updates on new listings and deals!</span>
                <span className="hidden sm:inline">Subscribe for the latest marketplace listings, exclusive deals, and campus updates!</span>
              </p>
              <div className="flex max-w-md mx-auto lg:mx-0">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-l-xl text-black text-xs sm:text-sm bg-gray-100 border border-gray-300 focus:outline-none focus:border-dark-accent transition-colors duration-300"
                />
                <button className="bg-gradient-to-r from-dark-accent to-yellow-300 text-black px-3 sm:px-6 py-2 sm:py-3 rounded-r-xl hover:from-yellow-300 hover:to-dark-accent transition-all duration-300 text-xs sm:text-sm font-bold shadow-lg hover:shadow-dark-accent/25 hover:scale-105">
                  <span className="sm:hidden">Join</span>
                  <span className="hidden sm:inline">Subscribe</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700/50 px-3 sm:px-4 gap-4 sm:gap-6">
          {/* Left Side - Copyright and Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
            <p className="text-gray-400 text-xs sm:text-sm">
              &copy; 2025 UW Buy Hub. All rights reserved.
            </p>
            <ul className="flex gap-3 sm:gap-6 text-xs">
              <li><a href="#privacy" className="hover:text-dark-accent transition-colors duration-300 hover:underline">Privacy</a></li>
              <li><a href="#terms" className="hover:text-dark-accent transition-colors duration-300 hover:underline">Terms</a></li>
              <li><a href="#safety" className="hover:text-dark-accent transition-colors duration-300 hover:underline">Safety</a></li>
            </ul>
          </div>

          {/* Right Side - Social Icons */}
          <div className="flex gap-3 sm:gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-dark-accent/20 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:text-dark-accent transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <FaFacebook size={16} className="sm:w-5 sm:h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-dark-accent/20 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:text-dark-accent transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <FaTwitter size={16} className="sm:w-5 sm:h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-dark-accent/20 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:text-dark-accent transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <FaInstagram size={16} className="sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer