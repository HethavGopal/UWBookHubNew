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
import getBaseUrl from '../../utils/baseURL';

const Recommended = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${getBaseUrl()}/api/listings/get-all-listings`);
        const data = await response.json();
        
        if (isMounted) {
          // Extract listings array from response object
          setBooks(data.listings || []);
          console.log('Fetched listings:', data.listings);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching listings:', error);
          setBooks([]); // Set empty array on error
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchListings();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className='py-8 sm:py-12 md:py-16 max-w-screen-2xl mx-auto px-3 sm:px-4'>
      <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-1.5 sm:w-2 h-8 sm:h-10 bg-gradient-to-b from-dark-accent to-yellow-300 rounded-full"></div>
          <span className="text-dark-accent font-bold text-xs sm:text-sm tracking-wider uppercase">Popular Picks</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent">Trending Items</h2>
      </div>
         
      <div className="relative [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-button-next]:scale-75 [&_.swiper-button-prev]:scale-75 sm:[&_.swiper-button-next]:scale-90 sm:[&_.swiper-button-prev]:scale-90 [&_.swiper-button-next]:right-0 [&_.swiper-button-prev]:left-0 sm:[&_.swiper-button-prev]:left-4 [&_.swiper-button-next]:bg-gradient-to-r [&_.swiper-button-next]:from-gray-800 [&_.swiper-button-next]:to-gray-700 [&_.swiper-button-prev]:bg-gradient-to-r [&_.swiper-button-prev]:from-gray-800 [&_.swiper-button-prev]:to-gray-700 [&_.swiper-button-next]:rounded-full [&_.swiper-button-prev]:rounded-full [&_.swiper-button-next]:w-10 [&_.swiper-button-prev]:w-10 [&_.swiper-button-next]:h-10 [&_.swiper-button-prev]:h-10 sm:[&_.swiper-button-next]:w-12 sm:[&_.swiper-button-prev]:w-12 sm:[&_.swiper-button-next]:h-12 sm:[&_.swiper-button-prev]:h-12 [&_.swiper-button-next]:shadow-xl [&_.swiper-button-prev]:shadow-xl [&_.swiper-button-next]:border [&_.swiper-button-prev]:border [&_.swiper-button-next]:border-gray-600/50 [&_.swiper-button-prev]:border-gray-600/50 [&_.swiper-button-next]:hover:border-dark-accent/50 [&_.swiper-button-prev]:hover:border-dark-accent/50">
        {loading ? (
          <div className="text-center py-8">
            <div className="text-dark-text">Loading recommendations...</div>
          </div>
        ) : (
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
            {books.length > 0 && books.slice(0, 18).map((book, index) => (
              <SwiperSlide key={index} className="pb-6 sm:pb-8">
                <BookCard book={book} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  )
}

export default Recommended