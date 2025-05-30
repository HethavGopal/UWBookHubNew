import React from 'react'
import news1 from '../../assets/news1.avif'
import news2 from '../../assets/news2.avif'
import news3 from '../../assets/news3.avif'
import news4 from '../../assets/news4.avif'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const news = [
    {
        "id": 1,
        "title": "PitcherNet helps researchers with AI analysis",
        "description": "Baltimore Orioles tasks Waterloo Engineering researchers to develop AI tech that can monitor pitchers using low-resolution video captured by smartphones",
        "image": news1
    },
    {
        "id": 2,
        "title": "Planting the seeds for innovation and curiosity",
        "description": "More than 100,000 children and youth from across the region are discovering the wonders of science and technology through the University of Waterloo",
        "image": news2
    },
    {
        "id": 3,
        "title": "Shaping the future of health through innovation and entrepreneurship",
        "description": "Waterloo hosts more than 200 global leaders at the Times Higher Education Digital Health 2025 summit",
        "image": news3
    },
    {
        "id": 4,
        "title": "Made by Waterloo",
        "description": "Discover how Waterloo alumni are driving Canada's economy with five tech companies making a local and global impact",
        "image": news4
    },
]

const News = () => {
    return (
      <div className='py-20 max-w-screen-2xl mx-auto px-4'>
        <div className="mb-12 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-10 bg-gradient-to-b from-dark-accent to-yellow-300 rounded-full"></div>
            <span className="text-dark-accent font-bold text-sm tracking-wider uppercase">Latest Updates</span>
          </div>
          <h2 className='text-4xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent'>News & Stories</h2>
        </div>
  
          <div className="relative [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-button-next]:bg-gradient-to-r [&_.swiper-button-next]:from-gray-800 [&_.swiper-button-next]:to-gray-700 [&_.swiper-button-prev]:bg-gradient-to-r [&_.swiper-button-prev]:from-gray-800 [&_.swiper-button-prev]:to-gray-700 [&_.swiper-button-next]:rounded-full [&_.swiper-button-prev]:rounded-full [&_.swiper-button-next]:w-12 [&_.swiper-button-prev]:w-12 [&_.swiper-button-next]:h-12 [&_.swiper-button-prev]:h-12 [&_.swiper-button-next]:shadow-xl [&_.swiper-button-prev]:shadow-xl [&_.swiper-button-next]:border [&_.swiper-button-prev]:border [&_.swiper-button-next]:border-gray-600/50 [&_.swiper-button-prev]:border-gray-600/50">
          <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper [&_.swiper-pagination-bullet-active]:bg-dark-accent [&_.swiper-pagination-bullet]:bg-gray-600 pb-16"
        >
          
          {
              news.map((item, index) => (
                  <SwiperSlide key={index}>
                      <div className='flex flex-col sm:flex-row sm:justify-between items-start gap-6 h-full bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-600/30 group hover:border-dark-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-dark-accent/10 hover:-translate-y-2'>
                          {/* content */}
                          <div className='w-full sm:w-1/2 space-y-4'>
                              <Link to="/" className="group-inner">
                                   <h3 className='text-xl font-bold hover:text-dark-accent text-dark-text transition-colors duration-300 leading-tight group-inner-hover:text-dark-accent'>{item.title}</h3>
                              </Link>
                              <div className='w-16 h-1 bg-gradient-to-r from-dark-accent to-yellow-300 rounded-full'></div>
                              <p className='text-sm leading-relaxed text-gray-300 group-hover:text-gray-200 transition-colors duration-300'>{item.description}</p>
                              <div className="pt-2">
                                <Link to="/" className="inline-flex items-center gap-2 text-dark-accent hover:text-yellow-300 font-semibold text-sm transition-colors duration-300">
                                  Read more 
                                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </Link>
                              </div>
                          </div>
  
                          <div className='w-full sm:w-1/2 h-[250px] group-image'>
                              <div className="relative h-full rounded-xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                                <img src={item.image} alt={item.title} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'/>
                              </div>
                          </div>
                      </div>
                  </SwiperSlide>
              ) )
          }
        </Swiper>
        </div>
      </div>
    )
  }
  
  export default News