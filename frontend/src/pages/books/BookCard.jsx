import React from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiMapPin, FiMail } from 'react-icons/fi'
import { BiBookOpen } from 'react-icons/bi'
import { BsShield } from 'react-icons/bs'

const BookCard = ({book}) => {
  // Helper function to get condition color
  const getConditionColor = (condition) => {
    switch(condition) {
      case 'new': return 'text-green-400 bg-green-400/20'
      case 'like-new': return 'text-blue-400 bg-blue-400/20'
      case 'good': return 'text-yellow-400 bg-yellow-400/20'
      case 'fair': return 'text-orange-400 bg-orange-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 border-0 group hover:-translate-y-1 sm:hover:-translate-y-2 w-full max-w-sm mx-auto">
      {/* Vertical Layout Container */}
      <div className="flex flex-col h-80 sm:h-96 relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl sm:rounded-2xl">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/5 via-transparent to-yellow-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl"></div>
        
        {/* Image Container - Top Section */}
        <div className="h-2/3 p-3 sm:p-4 flex items-center justify-center relative z-10">
          <Link to={`/listings/${book._id}`} className="block w-full h-full group-inner">
            <div className="relative h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/10 to-yellow-300/10 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={book.images && book.images.length > 0 ? book.images[0] : '/placeholder-book.jpg'}
                alt={book.title}
                className="relative max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-500 rounded-lg sm:rounded-xl"
              />
              {/* Book category badge */}
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-dark-accent/90 text-black px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <BiBookOpen className="inline w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                <span className="hidden sm:inline">{book.category || 'Book'}</span>
              </div>
              {/* Heart icon - top right */}
              <button className="absolute top-1 right-1 sm:top-2 sm:right-2 text-gray-400 hover:text-red-400 transition-colors duration-300 p-1 hover:scale-110 bg-black/20 rounded-full opacity-0 group-hover:opacity-100">
                <FiHeart className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </Link>
        </div>

        {/* Content Container - Bottom Section */}
        <div className="h-1/3 p-3 sm:p-4 flex flex-col relative z-10">
          {/* Title and Condition Row */}
          <div className="flex justify-between items-start mb-2">
            <Link to={`/listings/${book._id}`} className="flex-1 pr-2">
              <h3 className="text-sm sm:text-base font-bold text-dark-text hover:text-dark-accent transition-colors duration-300 line-clamp-2 group-hover:text-dark-accent leading-tight">
                {book.title}
              </h3>
            </Link>
            <div className={`px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${getConditionColor(book.condition)}`}>
              <BsShield className="inline w-2.5 h-2.5 mr-0.5" />
              <span>{book.condition}</span>
            </div>
          </div>

          {/* Location and Price Row */}
          <div className="flex justify-between items-center mb-2">
            {book.location ? (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <FiMapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{book.location}</span>
              </div>
            ) : (
              <div></div>
            )}
            <span className="text-lg sm:text-xl font-bold text-dark-text group-hover:text-dark-accent transition-colors duration-300">${book.price}</span>
          </div>
          
          {/* Contact Button - Full Width */}
          <Link 
            to={`/listings/${book._id}`}
            className="w-full bg-gradient-to-r from-dark-accent/90 to-yellow-300/90 hover:from-dark-accent hover:to-yellow-300 text-black py-2 sm:py-2.5 px-3 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm font-bold transform hover:scale-105 group-hover:-translate-y-1 mt-auto"
          >
            <FiMail className="text-sm" />
            <span>Contact Seller</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BookCard

