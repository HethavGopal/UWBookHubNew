import React from 'react'
import { Link } from 'react-router-dom'
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";



const NavBar = () => {

    const currentUser = false; 





  return (
    <header className='max-w-screen-2xl mx-auto px-4 py-6' >
        <nav className='flex justify-between items-center'>
            {/* Left Side */}
            <div className='flex items-center md:gap-16 gap-4'>
                <Link to="/"> 
                    <HiBars3CenterLeft className='size-6'/>
                 </Link>
                
                {/* search bar */}
                <div className='relative sm:w-72 w-40 space-x-2 '>
                    <IoSearchOutline className='absolute inline-block left-3 inset-y-2'/>
                    <input type="text" placeholder='Search' 
                    className='bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none'/>  
                </div>
            </div>
            <div className="relative flex items-center md:space-x-3 space-x-2">
            <div>
                {
                    currentUser ? 
                    
                    <button> 
                        <img src="" alt="" />
                    </button>
                    : 

                    <Link to="/login">  <FiUser className='size-6' /> </Link> 
                }
            </div>
            
            <button className='hidden sm:block'>
                <IoMdHeartEmpty className='size-6' />
            </button>
            <Link to="/cart" className='bg-[#FFD54F] p-1 sm:px-6 px-2 flex items-center gap-2 rounded-sm'>
                <AiOutlineShoppingCart />
                <span className='text-sm font-semibold sm:ml-1 '>0</span>
            </Link>
            </div>

        </nav>
    </header>
  )
}

export default NavBar