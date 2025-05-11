import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import getImgUrl from '../../utils/getImgUrl'
import { Link } from 'react-router-dom'


const BookCard = ({book}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative h-[350px] overflow-hidden p-4">
          <Link to={`/book/${book._id}`} className="block h-full">
            <img
              src={getImgUrl(book.coverImage)}
              alt={book.title}
              className="w-full h-full object-contain transform hover:scale-110 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col flex-grow">
          <Link to={`/books/${book._id}`} className="block mb-2">
            <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-1">
              {book.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-3 text-xs line-clamp-2">
            {book.description.length > 80 ? `${book.description.slice(0,80)}...` : book.description}
          </p>
          {/* Price and Button Container */}
          <div className="mt-auto">
            <div className="flex items-center mb-3">
              <span className="text-2xl font-bold text-gray-900">${book.newPrice}</span>
              <span className="ml-2 text-gray-500 line-through">${book.oldPrice}</span>
            </div>
            <button className="w-full bg-[#FFB700] text-black py-2 px-4 rounded-lg hover:bg-[#F2A900] transition-colors duration-300 flex items-center justify-center gap-2">
              <FiShoppingCart className="text-lg" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard

