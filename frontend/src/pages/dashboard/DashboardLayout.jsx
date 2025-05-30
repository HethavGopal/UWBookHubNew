import axios from 'axios';
import React, { useEffect, useState } from 'react'

import Loading from '../../components/Loading';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";

const DashboardLayout = () => {
  
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/")
  }

  return (
    <section className="flex min-h-screen w-full">
      <aside className="hidden sm:flex sm:flex-col bg-red-900">
        <a href="/" className="inline-flex items-center justify-center h-20 w-20 bg-red-900 hover:bg-red-800 focus:bg-red-800">
          <img src="/fav-icon.png" alt="" />
        </a>
        <div className="flex-grow flex flex-col justify-between text-white">
          <nav className="flex flex-col mx-4 my-6 space-y-4">
            <Link to="/dashboard" className="inline-flex items-center justify-center py-3 text-white bg-red-800 rounded-lg">
              <span className="sr-only">Dashboard</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </Link>
            <Link to="/dashboard/add-new-book" className="inline-flex items-center justify-center py-3 hover:text-gray-200 hover:bg-red-800 focus:text-gray-200 focus:bg-red-800 rounded-lg">
              <span className="sr-only">Add Book</span>
              <HiViewGridAdd className="h-6 w-6"/>
            </Link>
            <Link to="/dashboard/manage-books" className="inline-flex items-center justify-center py-3 hover:text-gray-200 hover:bg-red-800 focus:text-gray-200 focus:bg-red-800 rounded-lg">
              <span className="sr-only">Documents</span>
              <MdOutlineManageHistory className="h-6 w-6"/>
            </Link>
          </nav>
          <div className="inline-flex items-center justify-center h-20 w-20 border-t border-red-800">
            <button onClick={handleLogout} className="p-3 hover:text-gray-200 hover:bg-red-800 focus:text-gray-200 focus:bg-red-800 rounded-lg">
              <span className="sr-only">Logout</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
      <div className="flex-grow w-full">
        <header className="flex items-center h-20 px-4 bg-white border-b border-gray-200 w-full">
          <button className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
            <span className="sr-only">Menu</span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <div className="relative w-full max-w-md sm:-ml-2">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input type="text" role="search" placeholder="Search..." className="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg" />
          </div>
        </header>
        <main className="p-4 space-y-6 w-full">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between w-full">
            <div className="mr-6">
              <h1 className="text-4xl font-semibold mb-2 text-red-900">Dashboard</h1>
              <h2 className="text-gray-600 ml-0.5">Book Store Inventory</h2>
            </div>
            <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
              <Link to="/dashboard/manage-books" className="inline-flex px-5 py-3 text-red-900 hover:text-red-800 focus:text-red-800 hover:bg-red-50 focus:bg-red-50 border border-red-900 rounded-md mb-3">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Manage Books
              </Link>
              <Link to="/dashboard/add-new-book" className="inline-flex px-5 py-3 text-white bg-red-900 hover:bg-red-800 focus:bg-red-800 rounded-md ml-6 mb-3">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Book
              </Link>
            </div>
          </div>
          <Outlet/>
        </main>
      </div>
    </section>
  )
}

export default DashboardLayout