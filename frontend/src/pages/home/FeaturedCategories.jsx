import React from 'react'
import { BiBook, BiDesktop, BiMobile, BiHome, BiUser, BiCar } from 'react-icons/bi'
import { MdSportsSoccer, MdLocalGroceryStore } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const FeaturedCategories = () => {
  const navigate = useNavigate()

  const categories = [
    {
      name: 'Textbooks',
      icon: BiBook,
      description: 'Course books, study guides, supplies',
      marketplaceCategory: 'textbooks'
    },
    {
      name: 'Electronics',
      icon: BiDesktop,
      description: 'Laptops, tablets, accessories',
      marketplaceCategory: 'electronics'
    },
    {
      name: 'Dorm Essentials',
      icon: BiHome,
      description: 'Furniture, decor, appliances',
      marketplaceCategory: 'dorm'
    },
    {
      name: 'Clothing',
      icon: BiUser,
      description: 'Waterloo gear, casual wear',
      marketplaceCategory: 'clothing'
    },
    {
      name: 'Sports & Recreation',
      icon: MdSportsSoccer,
      description: 'Equipment, gear, tickets',
      marketplaceCategory: 'sports'
    },
    {
      name: 'Phones & Gadgets',
      icon: BiMobile,
      description: 'Smartphones, earbuds, chargers',
      marketplaceCategory: 'gadgets'
    },
    {
      name: 'Transportation',
      icon: BiCar,
      description: 'Bikes, scooters, bus passes',
      marketplaceCategory: 'transport'
    },
    {
      name: 'Miscellaneous',
      icon: MdLocalGroceryStore,
      description: 'Food, personal items, other',
      marketplaceCategory: 'misc'
    }
  ]

  const handleCategoryClick = (marketplaceCategory) => {
    navigate(`/marketplace?category=${marketplaceCategory}`)
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }

  const handleBrowseAllClick = () => {
    navigate('/marketplace')
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 max-w-screen-2xl mx-auto px-3 sm:px-4">
      <div className="mb-8 sm:mb-10 md:mb-12 text-center space-y-3 sm:space-y-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <div className="w-1.5 sm:w-2 h-8 sm:h-10 bg-gradient-to-b from-dark-accent to-yellow-300 rounded-full"></div>
          <span className="text-dark-accent font-bold text-xs sm:text-sm tracking-wider uppercase">Browse by Category</span>
          <div className="w-1.5 sm:w-2 h-8 sm:h-10 bg-gradient-to-b from-yellow-300 to-dark-accent rounded-full"></div>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent">
          Popular Marketplace Sections
        </h2>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 sm:px-0">
          <span className="sm:hidden">Find what you need from fellow Waterloo students</span>
          <span className="hidden sm:inline">Browse through different categories to find exactly what you need from fellow Waterloo students</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category, index) => {
          const Icon = category.icon
          return (
            <div
              key={category.name}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleCategoryClick(category.marketplaceCategory)}
            >
              <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50 hover:border-dark-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-dark-accent/10 hover:-translate-y-1 sm:hover:-translate-y-3 h-full">
                <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                  {/* Icon with simple background */}
                  <div className="p-3 sm:p-4 bg-gradient-to-r from-gray-600/50 to-gray-500/50 rounded-xl sm:rounded-2xl group-hover:from-dark-accent/20 group-hover:to-yellow-300/20 transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-dark-accent" />
                  </div>

                  {/* Category Info */}
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-dark-text group-hover:text-dark-accent transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Hover effect indicator */}
                  <div className="w-0 h-0.5 sm:h-1 bg-gradient-to-r from-dark-accent to-yellow-300 rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Call to action */}
      <div className="text-center mt-8 sm:mt-10 md:mt-12 px-4 sm:px-0">
        <button 
          onClick={handleBrowseAllClick}
          className="bg-gradient-to-r from-dark-accent to-yellow-300 text-black hover:from-yellow-300 hover:to-dark-accent px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-dark-accent/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 w-full sm:w-auto max-w-xs sm:max-w-none"
        >
          Browse All Categories
        </button>
      </div>
    </section>
  )
}

export default FeaturedCategories 