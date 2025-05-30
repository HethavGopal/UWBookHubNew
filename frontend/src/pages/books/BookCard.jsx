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
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl overflow-hidden transition-all duration-500 border-0 group hover:-translate-y-2 w-full max-w-sm mx-auto">
      {/* Fixed height container */}
      <div className="flex flex-row h-80 relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/5 via-transparent to-yellow-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
        
        {/* Image Container - Fixed width */}
        <div className="w-1/2 p-4 flex items-center justify-center relative z-10">
          <Link to={`/books/${book._id}`} className="block w-full h-full group-inner">
            <div className="relative h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-dark-accent/10 to-yellow-300/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={getImgUrl(book.coverImage)}
                alt={book.title}
                className="relative max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-500 rounded-xl"
              />
              {/* Book category badge */}
              <div className="absolute top-2 left-2 bg-dark-accent/90 text-black px-2 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <BiBookOpen className="inline w-3 h-3 mr-1" />
                {book.category || 'Book'}
              </div>
            </div>
          </Link>
        </div>

        {/* Content Container - Fixed width and height */}
        <div className="w-1/2 p-4 flex flex-col relative z-10">
          {/* Header with heart icon */}
          <div className="flex justify-between items-start mb-2">
            <Link to={`/books/${book._id}`} className="flex-1">
              <h3 className="text-sm font-bold text-dark-text hover:text-dark-accent transition-colors duration-300 line-clamp-2 group-hover:text-dark-accent leading-tight">
                {book.title}
              </h3>
            </Link>
            <button className="text-gray-400 hover:text-red-400 transition-colors duration-300 ml-2 p-1 hover:scale-110">
              <FiHeart className="w-4 h-4" />
            </button>
          </div>

          {/* Rating stars */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className={`w-3 h-3 ${i < 4 ? 'text-dark-accent fill-current' : 'text-gray-500'}`} />
            ))}
            <span className="text-xs text-gray-400 ml-1">(4.2)</span>
          </div>
          
          {/* Description - Fixed height with ellipsis */}
          <div className="flex-1 mb-4">
            <p className="text-gray-300 text-xs leading-relaxed line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
              {book.description.length > 60 ? `${book.description.slice(0,60)}...` : book.description}
            </p>
          </div>
          
          {/* Price and Button Container - Always at bottom */}
          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-center">
              <span className="text-xl font-bold text-dark-text group-hover:text-dark-accent transition-colors duration-300">${book.newPrice}</span>
            </div>
            <button 
              onClick={() => handleAddToCart(book)}
              className="w-full bg-gradient-to-r from-dark-accent/90 to-yellow-300/90 hover:from-dark-accent hover:to-yellow-300 text-black py-2.5 px-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs font-bold transform hover:scale-105 group-hover:-translate-y-1"
            >
              <FiShoppingCart className="text-base" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard

