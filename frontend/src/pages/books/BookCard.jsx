import React from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiStar, FiHeart } from 'react-icons/fi'
import { BiBookOpen } from 'react-icons/bi'
import getImgUrl from '../../utils/getImgUrl'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'



const BookCard = ({book}) => {

  const dispatch = useDispatch()


  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 border-0 group hover:-translate-y-1 sm:hover:-translate-y-2 w-full max-w-sm mx-auto">
      {/* Fixed height container - responsive height */}
      <div className="flex flex-row h-72 sm:h-80 relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl sm:rounded-2xl">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/5 via-transparent to-yellow-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl"></div>
        
        {/* Image Container - Fixed width */}
        <div className="w-1/2 p-3 sm:p-4 flex items-center justify-center relative z-10">
          <Link to={`/books/${book._id}`} className="block w-full h-full group-inner">
            <div className="relative h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/10 to-yellow-300/10 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={getImgUrl(book.coverImage)}
                alt={book.title}
                className="relative max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-500 rounded-lg sm:rounded-xl"
              />
              {/* Book category badge */}
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-dark-accent/90 text-black px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <BiBookOpen className="inline w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                <span className="hidden sm:inline">{book.category || 'Book'}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Content Container - Fixed width and height */}
        <div className="w-1/2 p-3 sm:p-4 flex flex-col relative z-10">
          {/* Header with heart icon */}
          <div className="flex justify-between items-start mb-1.5 sm:mb-2">
            <Link to={`/books/${book._id}`} className="flex-1">
              <h3 className="text-xs sm:text-sm font-bold text-dark-text hover:text-dark-accent transition-colors duration-300 line-clamp-2 group-hover:text-dark-accent leading-tight">
                {book.title}
              </h3>
            </Link>
            <button className="text-gray-400 hover:text-red-400 transition-colors duration-300 ml-1 sm:ml-2 p-0.5 sm:p-1 hover:scale-110">
              <FiHeart className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Rating stars */}
          <div className="flex items-center gap-0.5 sm:gap-1 mb-2 sm:mb-3">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < 4 ? 'text-dark-accent fill-current' : 'text-gray-500'}`} />
            ))}
            <span className="text-xs text-gray-400 ml-0.5 sm:ml-1">(4.2)</span>
          </div>
          
          {/* Description - Fixed height with ellipsis */}
          <div className="flex-1 mb-3 sm:mb-4">
            <p className="text-gray-300 text-xs leading-relaxed line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
              {book.description.length > 50 ? `${book.description.slice(0,50)}...` : book.description}
            </p>
          </div>
          
          {/* Price and Button Container - Always at bottom */}
          <div className="mt-auto space-y-2 sm:space-y-3">
            <div className="flex items-center justify-center">
              <span className="text-lg sm:text-xl font-bold text-dark-text group-hover:text-dark-accent transition-colors duration-300">${book.newPrice}</span>
            </div>
            <button 
              onClick={() => handleAddToCart(book)}
              className="w-full bg-gradient-to-r from-dark-accent/90 to-yellow-300/90 hover:from-dark-accent hover:to-yellow-300 text-black py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs font-bold transform hover:scale-105 group-hover:-translate-y-1"
            >
              <FiShoppingCart className="text-sm sm:text-base" />
              <span className="hidden sm:inline">Add to Cart</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard

