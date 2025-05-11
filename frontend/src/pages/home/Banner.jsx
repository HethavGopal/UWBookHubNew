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
              <span className="text-[#FF3811] font-bold">Book Collection</span>
              <h1 className='md:text-5xl text-3xl font-bold text-gray-800 leading-tight'>
                Newly Posted Books
              </h1>
            </div>
            <p className='text-gray-600 text-lg leading-relaxed'>
              It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone
            </p>
            <button className='btn-primary hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300'>
              View All Books
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner