import React from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import getImgUrl from '../../utils/getImgUrl'

const BookCard = ({book}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="flex flex-row h-full">
        {/* Image Container */}
        <div className="w-1/2 p-3 flex items-center">
          <Link to={`/books/${book._id}`} className="block w-full">
            <img
              src={getImgUrl(book.coverImage)}
              alt={book.title}
              className="w-full h-[250px] object-contain transform hover:scale-110 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Content Container */}
        <div className="w-1/2 p-4 flex flex-col">
          <Link to={`/books/${book._id}`} className="block mb-1">
            <h3 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">
              {book.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-2 text-xs line-clamp-2">
            {book.description.length > 80 ? `${book.description.slice(0,80)}...` : book.description}
          </p>
          
          {/* Price and Button Container */}
          <div className="mt-auto">
            <div className="flex items-center mb-2">
              <span className="text-lg font-bold text-gray-900">${book.newPrice}</span>
              <span className="ml-2 text-xs text-gray-500 line-through">${book.oldPrice}</span>
            </div>
            <button className="w-full bg-[#FFB700] text-black py-1 px-2 rounded-lg hover:bg-[#F2A900] transition-colors duration-300 flex items-center justify-center gap-1 text-xs">
              <FiShoppingCart className="text-sm" />
              Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard

