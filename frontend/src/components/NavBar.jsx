import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import avatarImg from '../assets/avatar.svg';
import wbhLogo from '../assets/WBH2.svg';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Orders', href: '/orders' },
  { name: 'Cart Page', href: '/cart' },
  { name: 'Check Out', href: '/checkout' },
];

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentUser = true;

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-screen-2xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left Side */}
          <div className="flex items-center md:gap-8 gap-4">
            <button className="lg:hidden text-dark-red hover:text-red-light">
              <HiBars3CenterLeft className="size-6" />
            </button>

            <Link to="/" className="flex items-center">
              <img src={wbhLogo} alt="WBH Logo" className="h-12 md:h-16 w-auto" />
            </Link>

            {/* Search bar */}
            <div className="relative sm:w-72 w-40">
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/60" />
              <input
                type="text"
                placeholder="Search"
                className="bg-white w-full py-2 md:px-8 px-6 rounded-lg border border-light-yellow focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="relative flex items-center md:space-x-4 space-x-3">
            <div className="relative">
              {currentUser ? (
                <>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="hover:ring-2 hover:ring-dark-red rounded-full transition-all"
                  >
                    <img
                      src={avatarImg}
                      alt="avatar"
                      className="size-8 rounded-full border-2 border-light-yellow"
                    />
                  </button>

                  {/* Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-light-yellow rounded-lg shadow-lg z-50">
                      <ul className="py-2">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className="block px-4 py-2 text-sm text-black hover:bg-light-yellow/20 hover:text-dark-red"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login" className="text-dark-red hover:text-red-light">
                  <FiUser className="size-6" />
                </Link>
              )}
            </div>

            <button className="text-dark-red hover:text-red-light transition-colors">
              <IoMdHeartEmpty className="size-6" />
            </button>

            <Link
              to="/cart"
              className="bg-light-yellow text-black px-4 py-2 flex items-center gap-2 rounded-lg hover:bg-yellow-light transition-colors"
            >
              <AiOutlineShoppingCart className="size-5" />
              <span className="text-sm font-medium">0</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
