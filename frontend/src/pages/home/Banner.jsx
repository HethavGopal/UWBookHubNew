import React from 'react'

import bannerImg from "../../assets/banner.png"


const Banner = () => {
  return (
    <div className='bg-white shadow-2xl rounded-2xl mb-8 border-t-4 border-[#FF3811]'>
      <div className='max-w-screen-2xl mx-auto px-4 md:px-8'>
        <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
          <div className='md:w-1/2 w-full flex items-center md:justify-end'>
            <img 
              src={bannerImg} 
              alt="banner" 
              className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          
          <div className='md:w-1/2 w-full space-y-6'>
            <div className="space-y-2">
              <span className="text-[#FF3811] font-bold text-xs">Book Collection</span>
              <h1 className='md:text-2xl text-xl font-bold text-gray-800 leading-tight'>
                Newly Posted Books
              </h1>
            </div>
            <p className='text-gray-600 text-xs leading-relaxed'>
            Looking to save money on textbooks? Discover the best deals on gently used books from fellow UW students. Whether you're gearing up for midterms or just finished a course, find what you need—or sell what you don't!
            </p>
            <button className='btn-primary hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-xs px-4 py-1.5 rounded'>
              View All Books
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner