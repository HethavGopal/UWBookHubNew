import React, { useState, useEffect } from 'react'
import BookCard from '../books/BookCard'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const TopSellers = () => {
  const [books, setBooks] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre")

  useEffect(() => {
    fetch("books.json")
      .then(res => res.json())
      .then(data => setBooks(data))
  }, [])

  const categories = ["Choose a genre", "Business", "Mathematics", "History", "Science", "Computer Science"]
  const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase())

  return (
    <div className='max-w-screen-2xl mx-auto px-4 py-6'>
      <div className="mb-4">
        <span className="text-[#FF3811] font-bold block mb-1 text-xs">Available Books</span>
        <h2 className="text-xl font-bold text-gray-800">Latest Books</h2>
      </div>
      
      {/* Category Filter */}
      <div className='mb-6'>
        <select 
          onChange={(e) => setSelectedCategory(e.target.value)} 
          name="category" 
          id="category" 
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF3811] bg-white text-gray-700 cursor-pointer hover:border-[#FF3811] transition-colors"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Books Swiper */}
      <div className="relative [&_.swiper-button-next]:text-[#FF3811] [&_.swiper-button-prev]:text-[#FF3811] [&_.swiper-button-next]:scale-75 [&_.swiper-button-prev]:scale-75 [&_.swiper-button-next]:right-0 [&_.swiper-button-prev]:left-4">
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
          {filteredBooks.length > 0 && filteredBooks.map((book, index) => (
            <SwiperSlide key={index} className="pb-8">
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default TopSellers