import React from 'react'
import Banner from './Banner'
import TopSellers from './TopSellers'
import Recommended from './Recommended'
import FeaturedCategories from './FeaturedCategories'
import HowItWorks from './HowItWorks'
import Newsletter from './Newsletter'

const Home = () => {
  return (
    <>
        <Banner/>
        <FeaturedCategories/>
        <HowItWorks/>
        <TopSellers/>
        <Recommended/>
        <Newsletter/>
    </>
  )
}

export default Home