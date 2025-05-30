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
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const { data: books = [], isLoading, error } = useFetchAllBooksQuery()
  
 

  const categories = ["All Categories", "Textbooks", "Electronics", "Dorm Essentials", "Clothing", "Sports & Recreation"]
  const filteredBooks = selectedCategory === "All Categories" 
    ? books 
    : books.filter(book => book?.category?.toLowerCase() === selectedCategory.toLowerCase())

  if (isLoading) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20">
        <div className="inline-flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-2 border-dark-accent border-t-transparent"></div>
          <span className="text-dark-text text-base sm:text-lg">Loading marketplace items...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="text-center py-8 sm:py-10 text-red-400 bg-red-900/20 rounded-xl mx-3 sm:mx-4 border border-red-700/30 text-sm sm:text-base">Error loading items: {error.message}</div>
  }

  return (
    <div className='max-w-screen-2xl mx-auto px-3 sm:px-4 py-8 sm:py-10 md:py-12'>
      <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-1.5 sm:w-2 h-8 sm:h-10 bg-gradient-to-b from-dark-accent to-yellow-300 rounded-full"></div>
          <span className="text-dark-accent font-bold text-xs sm:text-sm tracking-wider uppercase">Featured Items</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent">Recently Posted</h2>
      </div>
      
      {/* Category Filter */}
      <div className='mb-6 sm:mb-8'>
        <div className="relative inline-block w-full sm:w-auto">
          <select 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            name="category" 
            id="category" 
            className="appearance-none px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-dark-accent/50 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm text-dark-text cursor-pointer hover:border-dark-accent/50 transition-all duration-300 pr-10 sm:pr-12 font-semibold shadow-lg hover:shadow-dark-accent/10 w-full sm:w-auto"
          >
            {categories.map((category, index) => (
              <option key={index} value={category} className="bg-gray-800 text-dark-text font-medium">{category}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 pointer-events-none">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Books Swiper */}
      <div className="relative [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-button-next]:scale-75 [&_.swiper-button-prev]:scale-75 sm:[&_.swiper-button-next]:scale-90 sm:[&_.swiper-button-prev]:scale-90 [&_.swiper-button-next]:right-0 [&_.swiper-button-prev]:left-0 sm:[&_.swiper-button-prev]:left-4 [&_.swiper-button-next]:bg-gradient-to-r [&_.swiper-button-next]:from-gray-800 [&_.swiper-button-next]:to-gray-700 [&_.swiper-button-prev]:bg-gradient-to-r [&_.swiper-button-prev]:from-gray-800 [&_.swiper-button-prev]:to-gray-700 [&_.swiper-button-next]:rounded-full [&_.swiper-button-prev]:rounded-full [&_.swiper-button-next]:w-10 [&_.swiper-button-prev]:w-10 [&_.swiper-button-next]:h-10 [&_.swiper-button-prev]:h-10 sm:[&_.swiper-button-next]:w-12 sm:[&_.swiper-button-prev]:w-12 sm:[&_.swiper-button-next]:h-12 sm:[&_.swiper-button-prev]:h-12 [&_.swiper-button-next]:shadow-xl [&_.swiper-button-prev]:shadow-xl [&_.swiper-button-next]:border [&_.swiper-button-prev]:border [&_.swiper-button-next]:border-gray-600/50 [&_.swiper-button-prev]:border-gray-600/50 [&_.swiper-button-next]:hover:border-dark-accent/50 [&_.swiper-button-prev]:hover:border-dark-accent/50">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
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
            <SwiperSlide key={index} className="pb-6 sm:pb-8">
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default TopSellers