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
    <div className='py-15 max-w-screen-2xl mx-auto px-4'>
         <h2 className="text-xl font-bold text-gray-800">Recommended Books</h2>
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
  )
}

export default Recommended