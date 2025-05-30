import React from 'react'

import bannerImg from "../../assets/banner.png"


const Banner = () => {
  return (
    <div className='bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-800/80 backdrop-blur-sm shadow-2xl rounded-3xl mb-8 border border-gray-700/50 overflow-hidden relative'>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/5 via-transparent to-dark-accent/5 animate-pulse"></div>
      
      <div className='max-w-screen-2xl mx-auto px-4 md:px-8 relative z-10'>
        <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
          <div className='md:w-1/2 w-full flex items-center md:justify-end group'>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/20 to-yellow-300/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <img 
                src={bannerImg} 
                alt="banner" 
                className="relative rounded-2xl shadow-2xl hover:shadow-dark-accent/25 transition-all duration-500 transform group-hover:scale-105 group-hover:rotate-1"
              />
            </div>
          </div>
          
          <div className='md:w-1/2 w-full space-y-8'>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-dark-accent to-yellow-300 rounded-full"></div>
                <span className="text-dark-accent font-bold text-sm tracking-wider uppercase">Book Collection</span>
              </div>
              <h1 className='md:text-4xl text-3xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent leading-tight'>
                Newly Posted Books
              </h1>
            </div>
            <p className='text-gray-300 text-base leading-relaxed max-w-lg'>
            Looking to save money on textbooks? Discover the best deals on gently used books from fellow UW students. Whether you're gearing up for midterms or just finished a course, find what you need—or sell what you don't!
            </p>
            <div className="flex gap-4">
              <button className='bg-gradient-to-r from-dark-accent to-yellow-300 text-black hover:from-yellow-300 hover:to-dark-accent px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-dark-accent/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300'>
                View All Books
              </button>
              <button className='border-2 border-dark-accent/50 text-dark-accent hover:bg-dark-accent/10 px-8 py-3 rounded-xl font-bold text-sm hover:border-dark-accent transition-all duration-300 hover:scale-105'>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner