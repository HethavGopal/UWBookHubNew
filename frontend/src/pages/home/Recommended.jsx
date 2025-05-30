import React from 'react'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import BookCard from '../books/BookCard'
import { useFetchAllBooksQuery } from '../../redux/features/cart/booksAPI';

const Recommended = () => {


  const { data: books = [], isLoading, error } = useFetchAllBooksQuery()
    
  return (
    <div className='py-16 max-w-screen-2xl mx-auto px-4'>
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-10 bg-gradient-to-b from-dark-accent to-yellow-300 rounded-full"></div>
          <span className="text-dark-accent font-bold text-sm tracking-wider uppercase">Curated for You</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent">Recommended Books</h2>
      </div>
         
      <div className="relative [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-button-next]:scale-90 [&_.swiper-button-prev]:scale-90 [&_.swiper-button-next]:right-0 [&_.swiper-button-prev]:left-4 [&_.swiper-button-next]:bg-gradient-to-r [&_.swiper-button-next]:from-gray-800 [&_.swiper-button-next]:to-gray-700 [&_.swiper-button-prev]:bg-gradient-to-r [&_.swiper-button-prev]:from-gray-800 [&_.swiper-button-prev]:to-gray-700 [&_.swiper-button-next]:rounded-full [&_.swiper-button-prev]:rounded-full [&_.swiper-button-next]:w-12 [&_.swiper-button-prev]:w-12 [&_.swiper-button-next]:h-12 [&_.swiper-button-prev]:h-12 [&_.swiper-button-next]:shadow-xl [&_.swiper-button-prev]:shadow-xl [&_.swiper-button-next]:border [&_.swiper-button-prev]:border [&_.swiper-button-next]:border-gray-600/50 [&_.swiper-button-prev]:border-gray-600/50 [&_.swiper-button-next]:hover:border-dark-accent/50 [&_.swiper-button-prev]:hover:border-dark-accent/50">
         <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1180: {
              slidesPerView: 3,
              spaceBetween: 50,
            }
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {books.length > 0 && books.slice(0, 18).map((book, index) => (
            <SwiperSlide key={index} className="pb-8">
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
    </div>
  )
}

export default Recommended