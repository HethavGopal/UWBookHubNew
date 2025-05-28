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
      <div className='py-16 max-w-screen-2xl mx-auto px-4'>
          <h2 className='text-3xl font-semibold mb-6'>News </h2>
  
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
          className="mySwiper [&_.swiper-pagination-bullet-active]:bg-[#FF3811] pb-12"
        >
          
          {
              news.map((item, index) => (
                  <SwiperSlide key={index}>
                      <div className='flex flex-col sm:flex-row sm:justify-between items-start gap-6 h-full bg-white p-4 rounded-xl'>
                          {/* content */}
                          <div className='w-full sm:w-1/2 space-y-3'>
                              <Link to="/">
                                   <h3 className='text-lg font-semibold hover:text-blue-500'>{item.title}</h3>
                              </Link>
                              <div className='w-12 h-[3px] bg-primary'></div>
                              <p className='text-xs leading-relaxed text-gray-600'>{item.description}</p>
                          </div>
  
                          <div className='w-full sm:w-1/2 h-[220px]'>
                              <img src={item.image} alt={item.title} className='w-full h-full object-cover rounded-lg shadow-md'/>
                          </div>
                      </div>
                  </SwiperSlide>
              ) )
          }
        </Swiper>
      </div>
    )
  }
  
  export default News