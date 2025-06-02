import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { BiTrendingUp, BiBookOpen } from "react-icons/bi";
import avatarImg from '../assets/avatar.svg';
import wbhLogo from '../assets/WBHDARK.svg';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Orders', href: '/orders' },
  { name: 'Sell Item', href: '/add-new-item' },
  { name: 'Check Out', href: '/checkout' },
];

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems)
  const {currentUser, logoutUser} = useAuth();

  // Mock search suggestions
  const searchSuggestions = [
    { type: 'trending', title: 'Calculus Textbooks', category: 'Mathematics' },
    { type: 'trending', title: 'Data Structures', category: 'Computer Science' },
    { type: 'category', title: 'Engineering', count: '2,800+ books' },
    { type: 'category', title: 'Business', count: '1,900+ books' },
    { type: 'recent', title: 'Physics for Engineers', category: 'Science' },
    { type: 'recent', title: 'Organic Chemistry', category: 'Science' },
  ];

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsDropdownOpen(false); // Close dropdown after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  // Simplified scroll effect with single threshold
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          setIsScrolled(scrollTop > 50); // Single threshold at 50px
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
      if (isSearchFocused && !event.target.closest('.search-container')) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen, isSearchFocused]);

  return (
    <header className={`fixed top-0 left-0 right-0 transition-all duration-500 ease-out z-50 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-xl shadow-2xl border-b border-gray-700/60 py-2 sm:py-3' 
        : 'bg-gradient-to-r from-gray-900/90 via-black/90 to-gray-900/90 backdrop-blur-md border-b border-gray-700/40 shadow-xl py-3 sm:py-4'
    }`}>
      <nav className="w-full px-3 sm:px-4">
        <div className="flex justify-between items-center">
          {/* Left Side */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
            <Link to="/" className="flex items-center group">
              <img src={wbhLogo} alt="WBH Logo" className={`w-auto transition-all duration-500 ease-out group-hover:scale-105 ${
                isScrolled ? 'h-8 sm:h-10 md:h-12' : 'h-10 sm:h-12 md:h-16'
              }`} />
            </Link>

            {/* Enhanced Search bar with suggestions - Hidden on very small screens */}
            <div className={`relative search-container transition-all duration-500 ease-out hidden xs:block ${
              isScrolled ? 'w-24 sm:w-48 md:w-64' : 'w-28 sm:w-56 md:w-72'
            }`}>
              <IoSearchOutline className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 z-10 size-3 sm:size-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search..."
                className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm text-dark-text w-full py-2 sm:py-2.5 pl-8 sm:pl-10 md:pl-12 pr-3 sm:pr-4 text-xs sm:text-sm rounded-lg sm:rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-dark-accent/50 focus:border-dark-accent transition-all duration-300 hover:border-gray-500 hover:shadow-lg hover:shadow-dark-accent/10"
              />
              
              {/* Search Suggestions Dropdown */}
              {isSearchFocused && (searchQuery.length > 0 || true) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl border border-gray-600/50 rounded-lg sm:rounded-xl shadow-2xl z-[9999] max-h-60 sm:max-h-80 overflow-y-auto">
                  {searchQuery.length > 0 ? (
                    <div className="p-1 sm:p-2">
                      {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((suggestion, index) => (
                          <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gradient-to-r hover:from-gray-700/50 hover:to-gray-600/50 rounded-lg cursor-pointer transition-all duration-200">
                            <div className="flex-shrink-0">
                              {suggestion.type === 'trending' && <BiTrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-dark-accent" />}
                              {suggestion.type === 'category' && <BiBookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />}
                              {suggestion.type === 'recent' && <IoSearchOutline className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs sm:text-sm text-dark-text truncate">{suggestion.title}</div>
                              <div className="text-xs text-gray-400 truncate">
                                {suggestion.category && `in ${suggestion.category}`}
                                {suggestion.count && suggestion.count}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 sm:p-4 text-center text-gray-400 text-xs sm:text-sm">
                          No results found for "{searchQuery}"
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-1 sm:p-2">
                      <div className="p-2 sm:p-3 text-xs text-gray-400 border-b border-gray-700/50">Trending Searches</div>
                      {searchSuggestions.filter(s => s.type === 'trending').map((suggestion, index) => (
                        <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gradient-to-r hover:from-gray-700/50 hover:to-gray-600/50 rounded-lg cursor-pointer transition-all duration-200">
                          <BiTrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-dark-accent" />
                          <div className="flex-1">
                            <div className="text-xs sm:text-sm text-dark-text">{suggestion.title}</div>
                            <div className="text-xs text-gray-400">in {suggestion.category}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="relative flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <div className="relative dropdown-container">
              {currentUser ? (
                <>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="hover:ring-2 hover:ring-dark-accent/50 rounded-full transition-all duration-300 hover:scale-105 p-0.5 sm:p-1"
                  >
                    <img
                      src={avatarImg}
                      alt="avatar"
                      className={`rounded-full border-2 border-dark-accent shadow-lg transition-all duration-500 ease-out ${
                        isScrolled ? 'size-6 sm:size-7' : 'size-7 sm:size-8'
                      }`}
                    />
                  </button>

                  {/* Dropdown - Enhanced z-index and blur */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-black/95 backdrop-blur-xl border border-gray-600/50 rounded-xl shadow-2xl z-[9999]">
                      <ul className="py-1 sm:py-2">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className="block px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-dark-text hover:bg-gradient-to-r hover:from-gray-700/50 hover:to-gray-600/50 hover:text-dark-accent transition-all duration-300 rounded-lg mx-1 sm:mx-2"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                        <li className="border-t border-gray-700/50 mt-1 sm:mt-2 pt-1 sm:pt-2">
                          <button 
                            onClick={handleLogout} 
                            className="block w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-dark-text hover:bg-gradient-to-r hover:from-red-900/20 hover:to-red-800/20 hover:text-red-400 transition-all duration-300 rounded-lg mx-1 sm:mx-2"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                  <Link 
                    to="/login" 
                    className={`font-semibold text-dark-accent hover:text-yellow-300 border border-dark-accent/50 rounded-lg sm:rounded-xl hover:bg-dark-accent/10 hover:border-dark-accent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-dark-accent/20 ${
                      isScrolled ? 'px-2 sm:px-3 py-1 sm:py-1.5 text-xs' : 'px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm'
                    }`}
                  >
                    <span className="sm:hidden">Log</span>
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                  <Link 
                    to="/register" 
                    className={`font-semibold text-black bg-gradient-to-r from-dark-accent to-yellow-300 hover:from-yellow-300 hover:to-dark-accent rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-dark-accent/25 ${
                      isScrolled ? 'px-2 sm:px-3 py-1 sm:py-1.5 text-xs' : 'px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm'
                    }`}
                  >
                    <span className="sm:hidden">Join</span>
                    <span className="hidden sm:inline">Sign Up</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Heart and Cart - Hidden on mobile, visible on sm and up */}
            <button className="hidden sm:block text-dark-accent hover:text-yellow-300 transition-all duration-300 hover:scale-110 p-1 sm:p-2 hover:bg-dark-accent/10 rounded-lg sm:rounded-xl relative">
              <IoMdHeartEmpty className={`transition-all duration-500 ease-out ${isScrolled ? 'size-4 sm:size-5' : 'size-5 sm:size-6'}`} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center font-bold">0</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
