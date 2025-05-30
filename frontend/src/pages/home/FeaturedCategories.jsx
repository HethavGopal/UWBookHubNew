import React from 'react'
import { BiMath, BiHistory, BiCodeAlt, BiMoney, BiAtom, BiBook } from 'react-icons/bi'
import { MdEngineering, MdBiotech } from 'react-icons/md'

const FeaturedCategories = () => {
  const categories = [
    {
      name: 'Mathematics',
      icon: BiMath,
      description: 'Calculus, Statistics, Algebra'
    },
    {
      name: 'Computer Science',
      icon: BiCodeAlt,
      description: 'Programming, Algorithms, AI'
    },
    {
      name: 'Engineering',
      icon: MdEngineering,
      description: 'Mechanical, Electrical, Civil'
    },
    {
      name: 'Business',
      icon: BiMoney,
      description: 'Finance, Marketing, Management'
    },
    {
      name: 'Sciences',
      icon: BiAtom,
      description: 'Physics, Chemistry, Biology'
    },
    {
      name: 'History',
      icon: BiHistory,
      description: 'World History, Art History'
    },
    {
      name: 'Biotechnology',
      icon: MdBiotech,
      description: 'Genetics, Microbiology'
    },
    {
      name: 'General',
      icon: BiBook,
      description: 'Literature, Arts, Languages'
    }
  ]

  return (
    <section className="py-20 max-w-screen-2xl mx-auto px-4">
      <div className="mb-12 text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-2 h-10 bg-gradient-to-b from-dark-accent to-yellow-300 rounded-full"></div>
          <span className="text-dark-accent font-bold text-sm tracking-wider uppercase">Browse by Category</span>
          <div className="w-2 h-10 bg-gradient-to-b from-yellow-300 to-dark-accent rounded-full"></div>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-dark-text via-gray-200 to-dark-text bg-clip-text text-transparent">
          Popular Study Areas
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Find textbooks across all major fields of study at the University of Waterloo
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => {
          const Icon = category.icon
          return (
            <div
              key={category.name}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-dark-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-dark-accent/10 hover:-translate-y-3 h-full">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Icon with simple background */}
                  <div className="p-4 bg-gradient-to-r from-gray-600/50 to-gray-500/50 rounded-2xl group-hover:from-dark-accent/20 group-hover:to-yellow-300/20 transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-8 h-8 text-dark-accent" />
                  </div>

                  {/* Category Info */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-dark-text group-hover:text-dark-accent transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {category.description}
                    </p>
                  </div>

                  {/* Hover effect indicator */}
                  <div className="w-0 h-1 bg-gradient-to-r from-dark-accent to-yellow-300 rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Call to action */}
      <div className="text-center mt-12">
        <button className="bg-gradient-to-r from-dark-accent to-yellow-300 text-black hover:from-yellow-300 hover:to-dark-accent px-8 py-3 rounded-xl font-bold text-base shadow-lg hover:shadow-dark-accent/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
          Browse All Categories
        </button>
      </div>
    </section>
  )
}

export default FeaturedCategories 