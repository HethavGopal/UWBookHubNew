import React from 'react'

import bannerImg from "../../assets/banner.png"


const Banner = () => {
  return (
    <div className='bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-800/80 backdrop-blur-sm shadow-2xl rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 border border-gray-700/50 overflow-hidden relative mx-2 sm:mx-0'>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/5 via-transparent to-dark-accent/5 animate-pulse"></div>
      
      <div className='max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-8 relative z-10'>
        <div className='flex flex-col md:flex-row-reverse py-8 sm:py-12 md:py-16 justify-between items-center gap-8 sm:gap-12'>
          <div className='md:w-1/2 w-full flex items-center md:justify-end group'>
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/20 to-yellow-300/20 rounded-xl sm:rounded-2xl blur-xl sm:blur-2xl group-hover:blur-2xl sm:group-hover:blur-3xl transition-all duration-500"></div>
              <img 
                src={bannerImg} 
                alt="banner" 
                className="relative rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl hover:shadow-dark-accent/25 transition-all duration-500 transform group-hover:scale-105 group-hover:rotate-1 w-full h-auto"
              />
            </div>
          </div>
          
          <div className='md:w-1/2 w-full space-y-6 sm:space-y-8 text-center md:text-left'>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3 justify-center md:justify-start">
                <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-dark-accent to-yellow-300 rounded-full"></div>
                <span className="text-dark-accent font-bold text-xs sm:text-sm tracking-wider uppercase">Student Marketplace</span>
              </div>
              <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent leading-tight'>
                Waterloo Student Exchange
              </h1>
            </div>
            <p className='text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto md:mx-0'>
            <span className="sm:hidden">Your campus marketplace for textbooks, electronics, and essentials. Connect with fellow Warriors!</span>
            <span className="hidden sm:inline">The ultimate marketplace for University of Waterloo students. Buy and sell textbooks, electronics, dorm essentials, and more. Connect with fellow Warriors and find great deals right on campus!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <button className='bg-gradient-to-r from-dark-accent to-yellow-300 text-black hover:from-yellow-300 hover:to-dark-accent px-6 sm:px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-dark-accent/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 w-full sm:w-auto'>
                Browse Marketplace
              </button>
              <button className='border-2 border-dark-accent/50 text-dark-accent hover:bg-dark-accent/10 px-6 sm:px-8 py-3 rounded-xl font-bold text-sm hover:border-dark-accent transition-all duration-300 hover:scale-105 w-full sm:w-auto'>
                Start Selling
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner