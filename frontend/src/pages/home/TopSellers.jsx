import React, { useState, useEffect } from 'react'
import BookCard from '../books/BookCard'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

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
    <div className='max-w-screen-2xl mx-auto px-4 py-12'>
      <div className='bg-white shadow-2xl rounded-2xl p-8 border-t-4 border-[#FF3811]'>
        <div className="space-y-2 text-center mb-8">
          <span className="text-[#FF3811] font-bold">Available Books</span>
          <h2 className="text-4xl font-bold text-gray-800">Top Sellers</h2>
        </div>
        
        {/* Category Filter */}
        <div className='flex justify-center mb-12'>
          <select 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            name="category" 
            id="category" 
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF3811] bg-white text-gray-700 cursor-pointer hover:border-[#FF3811] transition-colors"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Books Swiper */}
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {filteredBooks.length > 0 && filteredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default TopSellers