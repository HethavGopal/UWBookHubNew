import React, { useState } from 'react'
import BookCard from '../books/BookCard'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { useFetchAllBooksQuery } from '../../redux/features/cart/booksAPI';

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre")
  const { data: books = [], isLoading, error } = useFetchAllBooksQuery()
  
 

  const categories = ["Choose a genre", "Business", "Mathematics", "History", "Science", "Computer Science"]
  const filteredBooks = selectedCategory === "Choose a genre" 
    ? books 
    : books.filter(book => book?.category?.toLowerCase() === selectedCategory.toLowerCase())

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">Error loading books: {error.message}</div>
  }

  return (
    <div className='max-w-screen-2xl mx-auto px-4 py-6'>
      <div className="mb-4">
        <span className="text-red-900 font-bold block mb-1 text-xs">Available Books</span>
        <h2 className="text-xl font-bold text-gray-800">Latest Books</h2>
      </div>
      
      {/* Category Filter */}
      <div className='mb-6'>
        <select 
          onChange={(e) => setSelectedCategory(e.target.value)} 
          name="category" 
          id="category" 
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-900 bg-white text-gray-700 cursor-pointer hover:border-red-900 transition-colors"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Books Swiper */}
      <div className="relative [&_.swiper-button-next]:text-red-900 [&_.swiper-button-prev]:text-red-900 [&_.swiper-button-next]:scale-75 [&_.swiper-button-prev]:scale-75 [&_.swiper-button-next]:right-0 [&_.swiper-button-prev]:left-4">
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